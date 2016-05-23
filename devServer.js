var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var WebpackDevServer = require("webpack-dev-server");

var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
  // dev server options
  contentBase: config.output.path
})

server.listen(3000, "localhost", function() {});
