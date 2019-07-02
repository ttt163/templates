/**
 * Author：tantingting
 * Time：2019/2/22
 * Description：Description
 */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pathObj = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

let defHtmlObj = {
    title: `webpack4`,
    template: path.join(pathObj.src, './view/index.html'),
    filename: `index.html`,
    // chunks: ['index', 'vendors', 'runtime'],
    inject: true,
}
if (process.env.NODE_ENV === 'production') {
    defHtmlObj = {
        ...defHtmlObj,
        minify: {
            removeComments: true, //清除注释
            collapseWhitespace: true, // 清除空格换行符
            minifyCSS: true, // 压缩行内样式
            minifyJS: true, // 压缩js
            removeEmptyElements: false // 清除空元素，慎用！空元素可能用于占位，js有填充
        }
    }
}
const config = {
    entry: ['@babel/polyfill', path.join(pathObj.src, 'index.js')],
    output: {
        path: pathObj.dist,
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin(defHtmlObj)
    ]
}
module.exports = {
    config,
    pathObj
}
