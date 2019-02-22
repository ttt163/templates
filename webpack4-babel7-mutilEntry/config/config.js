/**
 * Author：tantingting
 * Time：2019/2/22
 * Description：Description
 */
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};
const getEntry = () => {
    let globPath = 'src/page/**/html/*.html'
    // (\/|\\\\) 这种写法是为了兼容 windows和 mac系统目录路径的不同写法
    let pathDir = 'src(\/|\\\\)page(/|\\\\)(.*?)(\/|\\\\)html'
    let files = glob.sync(globPath)
    let dirname, entries = []
    for (let i = 0; i < files.length; i++) {
        dirname = path.dirname(files[i])
        entries.push(dirname.replace(new RegExp('^' + pathDir), '$3')) // 如：[ 'about', 'home' ]
    }
    return entries
}
const mutilConfig = () => {
    let obj = {
        entry: {}, // 入口js
        html: [] // html-webpack-plugin
    }
    getEntry().forEach((item, i) => {
        obj.entry = {
            ...obj.entry,
            [item]: ['@babel/polyfill', path.join(PATHS.src, 'page', item, 'js', 'index.js')]
        }
        let defHtmlObj = {
            title: `es6-test-${item}`,
            template: path.join(PATHS.src, 'page', item, 'html', 'index.html'),
            filename: `html/${item}.html`,
            chunks: [item, 'vendors', 'commons', 'runtime'],
            inject: 'body',
        }
        if (process.env.NODE_ENV === 'development') {
            obj.html = [
                ...obj.html,
                new HtmlWebpackPlugin(defHtmlObj)
            ]
        } else {
            obj.html = [
                ...obj.html,
                new HtmlWebpackPlugin({
                    ...defHtmlObj,
                    minify: {
                        removeComments: true, //清除注释
                        collapseWhitespace: true, // 清除空格换行符
                        minifyCSS: true, // 压缩行内样式
                        minifyJS: true, // 压缩js
                        removeEmptyElements: false // 清除空元素，慎用！空元素可能用于占位，js有填充
                    }
                })
            ]
        }
        // entryObj[item] = path.resolve(__dirname, 'src', item, 'index.js')
    })
    return obj
}
module.exports = {
    getEntry,
    mutilConfig,
    PATHS
}
