/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');

const devServerPort = 3000;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${devServerPort}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index.js',
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'eval-source-map',
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
  ],
};
