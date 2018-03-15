// classname pattern is in cmrh.conf.js file. Must match webpack.
require('css-modules-require-hook/preset');

// Handle static asset types just as Webpack is doing
require('asset-require-hook')({
  extensions: ['svg', 'bmp', 'gif', 'jpg', 'jpeg', 'png'],
  publicPath: '/static/media/',
  name: '[name].[hash:8].[ext]',
});

// Set up babel to do its thing...
require('babel-register');
require('./server');
