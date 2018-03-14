const pkg = require('../../package.json');

const appEnv = process.env.APP_ENV || 'localhost';
const { domain, market } = pkg.name.split('.').reverse();
const config = {
  host: process.env.NODE_HOST || 'localhost', // Define your host from 'package.json'
  port: process.env.PORT || 3000,
  eurekaClient: false,
  application: {
    appName: pkg.name,
    market,
    domain,
    txnHeader: 'transaction_id',
  },
  portEndpoint: '169.254.170.20',
  eureka: {
    host: `eureka.vpca.us-east-1.eis-delivery${appEnv}.cloud`,
    hostName: `${pkg.name}-${market}-${domain}.vpca.us-east-1.eis-delivery${appEnv}.cloud`,
    ipAddress: '',
    maxRetries: 10000,
    hostPort: '*',
    eurekaPort: 8761,
    class: 'com.netflix.appinfo.AmazonInfo',
    name: 'Amazon',
    useLocalMetadata: true,
    preferIpAddress: true,
  },
  paths: {},
  languages: [{ code: 'en', label: 'English' }],
  info: function() {
    console.log('Current Info');
    console.log(`        appName : ${this.application.appName || 'N/A'}`);
    console.log(`        market : ${this.application.market || 'N/A'}`);
    console.log(`        domain : ${this.application.domain || 'N/A'}`);
    console.log(`Eureka Enabled : ${this.eurekaClient}`);
    if (this.eurekaClient) {
      console.log('Eureka Config');
      console.log(JSON.stringify(this.eureka, null, '\t'));
    }
  },
};

module.exports = config;
