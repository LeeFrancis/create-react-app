/* Set your postcss-loader configuration here */
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', 'ie >= 9', '> 5%'],
    },
    'postcss-nested': {}
  }
};
