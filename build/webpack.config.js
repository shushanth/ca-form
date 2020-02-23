'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { HotModuleReplacementPlugin } = require('webpack');
const { DEV_PORT, resolvePathDir } = require('./helpers');

module.exports = {
  entry: './src/main.js',
  output: {
    path: resolvePathDir('dist'),
    filename: 'app.bundle.js',
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
  },
  devServer: {
    port: DEV_PORT,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    contentBase: resolvePathDir('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      showErrors: true,
      cache: true,
      title: 'Customer alliance form',
      template: resolvePathDir('./src/index.html'),
    }),
  ],
};
