// Next step is to extract all the boilerplate fluff from Eureka registraion and put it with tooling leaving the server with very little
// to pass through in the ways of options
const getTooling = (options, caller) => {
  const opt = options || {};
  const loggerObject = require('./logger');
  const eurekaClient = require('./eurekaClient');
  const setLocale = require('./setLocale');
  const enableEureka = opt.eurekaClient;
  const { logger, middleware } = loggerObject(caller);

  const startEureka = () => {
    if (enableEureka) {
      eurekaClient
        .register()
        .then(client => {
          // If Eureka client registers successfully handle de-registration with SIGTERM and SIGINT
          client.once('registered', () => {
            process.removeAllListeners('SIGINT');
            process.on('SIGTERM', client.handleDeregister);
            process.on('SIGINT', client.handleDeregister);
          });
        })
        .catch(err => {
          logger.error(err);
        });
    }
  };
  return {
    startEureka,
    logger,
    loggerMiddleware: middleware,
    setLocale,
  };
};

module.exports = getTooling;
