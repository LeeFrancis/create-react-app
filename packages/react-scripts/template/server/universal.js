import path from 'path';
import fs from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import chalk from 'chalk';
import { Provider } from 'react-redux';
import { Route, StaticRouter, matchPath } from 'react-router-dom';
import createServerStore from '../src/utils/configureStore';
import App from '../src/components/App';
import createHistory from 'history/createMemoryHistory';
import clientRoutes from '../src/routes';
import config from './config';

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body }) => {
  data = data.replace('<html lang="en">', `<html ${html}`);
  data = data.replace('</head>', `${head}</head>`);
  data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  return data;
};

const universalLoader = (req, res) => {
  // Load in our HTML file from our build
  const filePath = path.resolve(__dirname, '../build/index.html');

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Read error', err);
      return res.status(500).end();
    }
    if (!config.serverSideRender) {
      res.status(200).send(htmlData);
      return;
    }
    // Create a store and sense of history based on the current path
    const history = createHistory();
    const store = createServerStore(history);
    const routerContext = {};

    // Here's the method for loading data from server-side
    const loadBranchData = (): Promise<*> | Object => {
      const promises = [];
      clientRoutes.some(route => {
        const match = matchPath(req.path, route);

        if (match && route.loadData)
          // $FlowFixMe: the params of pre-load actions are dynamic
          promises.push(route.loadData(store.dispatch, match.params));

        return match;
      });
      return Promise.all(promises);
    };

    (async () => {
      try {
        // First thing to do is load all needed data
        await loadBranchData();
        // Render App in React
        const htmlContent = renderToString(
          <Provider store={store}>
            <StaticRouter location={req.url} context={routerContext}>
              <Route component={App} />
            </StaticRouter>
          </Provider>
        );

        // Check if the render result contains a redirect, if so we need to set
        // the specific status and redirect header and end the response
        if (routerContext.url) {
          res.status(301).setHeader('Location', routerContext.url);
          res.end();
          return;
        }
        // Checking is page is 404
        const status = routerContext.status === '404' ? 404 : 200;
        // Let Helmet know to insert the right tags
        const helmet = Helmet.renderStatic();

        // Form the final HTML response
        const html = prepHTML(htmlData, {
          html: helmet.htmlAttributes.toString(),
          head:
            helmet.title.toString() +
            helmet.meta.toString() +
            helmet.link.toString(),
          body: htmlContent,
        });
        // Pass the route and initial state into html template
        res.status(status).send(html);
      } catch (err) {
        res.status(404).send('Not Found :(');
        console.error(chalk.red(`Rendering routes error: ${err}`));
      }
    })();
  });
};

export default universalLoader;
