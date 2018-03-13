// Ignore imported styles when running on nodejs
// https://github.com/bkonkle/ignore-styles
require('ignore-styles');

// Set up babel to do its thing... env for the latest toys, react-app for CRA
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app']
});
require('./server');