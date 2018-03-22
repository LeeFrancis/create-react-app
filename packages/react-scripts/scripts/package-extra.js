'use strict';
const merge = require('lodash/fp/merge');

const eisPckJson = {
  scripts: {
    'start:ssr': 'better-npm-run start:ssr',
    lint: './node_modules/.bin/eslint  src/**.jsx  src/**.js server/**.js',
  },
  betterScripts: {
    'start:ssr': {
      command: 'npm run build; nodemon ./server',
      env: {
        NODE_ENV: 'development',
        APP_ENV: 'localhost',
      },
    },
  },
};

module.exports = function(pkgJson) {
  return merge(pkgJson, eisPckJson);
};
