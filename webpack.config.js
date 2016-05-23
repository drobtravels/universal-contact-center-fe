var path = require('path');
var webpack = require('webpack');
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './src/index'
  ],

  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  },

  devServer: {
    contentBase: BUILD_PATH,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    host: 'localhost',
    port: 3000
  }
};
