const logger = require('platform.shared.nodelogger');

const config = require('../config');

const { appName, market, domain } = config.application;

const options = {
  appName,
  market,
  domain,
  level: process.env.APP_ENV === 'live' ? 'WARN' : 'ALL',
};

module.exports = caller => ({
  logger: logger(
    Object.assign(
      {},
      options,
      process.env.NODE_ENV === 'production' ? { type: 'json' } : {}
    )
  )(caller),
  middleware: logger.middleware,
});
