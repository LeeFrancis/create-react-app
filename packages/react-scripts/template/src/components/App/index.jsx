import React from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash/fp';
import { IntlProvider } from 'react-intl';
import routes from '../../routes';

// Import your global styles here
import styles from './styles.css';
import ErrorBoundary from '../../error';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
  <Route
    key={_.uniqueId()}
    exact={route.exact || false}
    path={route.path}
    render={props => (
      // Pass the sub-routes down to keep nesting
      <ErrorBoundary team={route.team || null}>
        <route.component {...props} routes={route.routes || null} />
      </ErrorBoundary>
    )}
  />
);

const App = () => (
  <IntlProvider locale="en">
    <React.Fragment>
      <div className={styles.page}>
        <main id="main-content">
          <div data-auto="main-content-wrapper">
            <Switch>{routes.map(route => RouteWithSubRoutes(route))}</Switch>
          </div>
        </main>
      </div>
    </React.Fragment>
  </IntlProvider>
);

export default App;
