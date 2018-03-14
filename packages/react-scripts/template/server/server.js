import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import index from './routes/routes-index';
import api from './routes/routes-api';
import universalLoader from './universal';
import getTooling from './lib/tooling';
import config from './config';

// Create our express app (using the port optionally specified)
const app = express();
const { host, port = 3000, application, eurekaClient } = config;
const { appName, market, domain, txnHeader } = application;
const tooling = getTooling({
  appName,
  market,
  domain,
  eurekaClient,
});
// This will be conditional dependant on boolean val eureka client
tooling.startEureka();
// handle locale
app.use(tooling.setLocale(config.languages));
// Logger middleware
app.use(tooling.loggerMiddleware(txnHeader));

// Compress, parse, and log
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Set up route handling, include static assets and an optional API
app.use('/', index);
app.use(express.static(path.resolve(__dirname, '../build')));
app.use('/api', api);
app.use('/', universalLoader);

app.listen(port, () => {
  console.log(`Starting with following :`);
  config.info();
  console.log(`Listening on port ${port}!`);
});

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
