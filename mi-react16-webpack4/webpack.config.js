const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const config = require('./webpack.config.common.js');


Object.keys(config.entry).forEach((key) => {
  config.entry[key] = ['@babel/polyfill'].concat(config.entry[key]);
});

config.output.publicPath = '/';

config.mode = 'production';

config.optimization = {
    ...config.optimization,
    minimizer: [ // 代码压缩
        // 压缩js
        new TerserPlugin({
            sourceMap: true,
            cache: true,
            parallel: true
        }),
        // 用于优化css文件
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessorOptions: {
                safe: true,
                autoprefixer: { disable: true }, //这里注意下,一定要指定为true。否则的话该插件会把我们用autoprefix加好的前缀都移除掉
                mergeLonghand: false,
                discardComments: {
                    removeAll: true // 移除注释
                }
            },
            canPrint: true
        })
    ]
}

config.plugins = [
    new MiniCssExtractPlugin({
        filename: "css/[name].[chunkhash].css"
    }),
  new CleanWebpackPlugin(['dist']),
];

const views = Object.keys(config.entry); // 按照入口文件名字查找html文件

views.forEach((viewname) => {
  const conf = {
    template: `./views/${viewname}.html`,
    filename: `./html/${viewname}.html`,
    inject: 'body',
      chunks: ['vendors', 'runtime', `${viewname}`],
      minify: {
          removeComments: true, //清除注释
          collapseWhitespace: true, // 清除空格换行符
          minifyCSS: true, // 压缩行内样式
          minifyJS: true, // 压缩js
          removeEmptyElements: false // 清除空元素，慎用！空元素可能用于占位，js有填充
      }
  };
  const htmlPlugin = new HtmlWebpackPlugin(conf);
  config.plugins.push(htmlPlugin);
});


module.exports = config;
