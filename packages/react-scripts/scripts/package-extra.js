'use strict';
const merge = require('lodash/fp/merge');

const eisPckJson = {
  scripts: {
    'start:ssr': 'better-npm-run start:ssr',
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
