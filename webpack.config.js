const webpack = require('webpack');

module.exports = {
  // other config options...
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
};
