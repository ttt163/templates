/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
const path = require('path');
const webpack = require('webpack');
const {mutilConfig, PATHS} = require('./config')
const copyWebpackPlugin = require("copy-webpack-plugin");

const {entry, html} = mutilConfig()
module.exports = {
    mode: 'development', // development
    context: __dirname, //修改上下文目录
    entry: entry,
    output:{
        filename:'js/[name].js',
        path: PATHS.dist
    },
    optimization: {
        runtimeChunk: 'single', // 将runtime打包到文件中
        splitChunks: {
            cacheGroups: {
                vendors: { // 将node_modules中的模块统一打包成vendors.js
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    enforce: true, // 是否启用上层minSize,true：则使用0，false：使用上层minSize
                    chunks: 'all',
                    priority: 3 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                commons: { // 将common中的模块统一打包成common.js
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'commons',
                    minSize: 30000,
                    minChunks: 3, //最少被几个chunk引用
                    chunks: 'all',
                    priority: 1,
                    reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
                }
            }
        }
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        cacheDirectory:true//缓存
                    }
                }
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ]
            },
            // {
            //     test: /\.(html|ejs)$/, // 处理页面引入img
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: ['img:src', 'img:data-src', 'audio:src'],
            //             minimize: true
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new copyWebpackPlugin([{
            from: path.resolve(PATHS.src,'assets'),
            to: path.resolve(PATHS.dist,'assets')
        }]),
        ...html,
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: PATHS.dist, //启动本地服务时访问的根目录
        compress: true,
        open: true,
        port: 8088, // 配置端口
        // publicPath: 'http://localhost:8088/',
        inline: true,
        hot: true
    },
    stats: {
        children: false
    }
};
