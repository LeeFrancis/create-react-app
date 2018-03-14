const logger = require('platform.shared.nodelogger');

// const { appName, market, domain } = config.application;

// const options = {
//   appName,
//   market,
//   domain,
//   level: process.env.APP_ENV === 'live' ? 'WARN' : 'ALL'
// };

module.exports = options => ({
  logger: logger(
    Object.assign(
      {},
      options,
      process.env.NODE_ENV === 'production' ? { type: 'json' } : {}
    )
  ),
  middleware: logger.middleware,
});
