const resilientEureka = require('platform.shared.resilient-eureka');
const config = require('../config');

const defaultInstanceId = process.env.HOSTNAME || 'localhost';
const defaultAppPort = config.port;
const defaultDynamicBindingEndpoint = config.portEndpoint;
const defaultAppName = config.application.appName;
const version = process.env.APP_VERSION || 'unknown_version';
const { eureka } = config;
const register = logger =>
  resilientEureka
    .register({
      logger,
      portEndpoint: defaultDynamicBindingEndpoint,
      instance: {
        app: defaultAppName,
        vipAddress: defaultAppName,
        hostName: eureka.hostName,
        ipAddr: eureka.ipAddress,
        port: eureka.hostPort,
        instanceId: `${defaultAppName}_v${version}:${defaultInstanceId}:${defaultAppPort}`,
        metadata: { version },
        homePageUrl: `http://__HOST__:${defaultAppPort}/`,
        statusPageUrl: `http://__HOST__:${defaultAppPort}/info`,
        healthCheckUrl: `http://__HOST__:${defaultAppPort}/health`,
        name: eureka.name,
        class: eureka.class,
      },
      eureka: {
        preferIpAddress: eureka.preferIpAddress,
        useLocalMetadata: eureka.useLocalMetadata,
        host: eureka.host,
        port: eureka.eurekaPort,
        servicePath: '/eureka/apps/',
        maxRetries: eureka.maxRetries,
      },
    })
    .then(eurekaClient => {
      const handleDeregister = () => {
        eurekaClient.stop(err => {
          if (err) {
            logger.error(err);
            process.exit(1);
          }
          process.exit(0);
        });
      };

      return Object.assign({}, eurekaClient, handleDeregister);
    });

module.exports = { register };
