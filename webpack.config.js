const webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: 'chunk.[name].[chunkhash].js',
    path: __dirname + '/build',
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'node_modules',
    //   minChunks: module => module.context.includes('node_modules')
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   minChunks: 1,
    //   async: true,
    //   children: false,
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'webpack'
    // }),
  ],
};
