/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const devServerPort = 3000;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      matrixTraversalSolverUrl: path.resolve(__dirname, 'src/constants/matrixTraversalSolverUrl.development.js'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    hot: true,
    https: false,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    port: devServerPort,
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WebpackBuildNotifierPlugin({ successSound: false }),
  ],
};
