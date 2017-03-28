/* eslint import/no-extraneous-dependencies: 0 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
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
};
