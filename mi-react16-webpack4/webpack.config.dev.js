const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.config.common.js');
const pkg = require('./package.json');

const isHttps = process.env.PROTOCOL_ENV === 'https';
const hmrPath = `${isHttps ? 'https' : 'http'}://localhost:${isHttps ? pkg.port.https : pkg.port.http}/__webpack_hmr`;
const webpackHotClient = `webpack-hot-middleware/client?reload=true&quiet=true&path=${hmrPath}`;

Object.keys(config.entry).forEach((key) => {
  config.entry[key] = ['@babel/polyfill', webpackHotClient].concat(config.entry[key]);
});

config.mode = 'development';

config.devtool = 'source-map';

const views = Object.keys(config.entry); // 按照入口文件名字查找html文件

views.forEach((viewname) => {
  const conf = {
    template: `./views/${viewname}.html`,
    filename: `${viewname}.html`,
    inject: 'body',
    chunks: ['vendors', 'runtime', `${viewname}`],
  };
  const htmlPlugin = new HtmlWebpackPlugin(conf);
  config.plugins.push(htmlPlugin);
});
config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = config;
