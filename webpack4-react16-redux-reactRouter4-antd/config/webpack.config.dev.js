/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
const path = require('path');
const webpack = require('webpack');
const {config, pathObj} = require('./config')
module.exports = {
    ...config,
    mode: 'development',
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
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
            }
        ]
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
    plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        stats: { colors: true },
        // host: '127.0.0.1',
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://apps.lianziapp.com:8800',
                secure: false,
                changeOrigin: true
            }
        }
    }
}
