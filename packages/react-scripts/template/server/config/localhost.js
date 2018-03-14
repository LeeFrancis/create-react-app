const merge = require('lodash/fp/merge');
const pkg = require('../../package.json');

const defaultConfig = require('./default');

module.exports = merge(defaultConfig, {
  eurekaClient: false,
  eureka: {
    // host: '127.0.0.1', For a locally deployed Eureka
    host: `eureka.vpca.us-east-1.eis-deliverydevqa.cloud`,
    hostName: pkg.name,
    ipAddress: '',
    region: '',
    hostPort: 3000,
    eurekaPort: 8761,
    class: 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
    name: 'MyOwn',
    useLocalMetadata: true,
    preferIpAddress: true,
  },
});
