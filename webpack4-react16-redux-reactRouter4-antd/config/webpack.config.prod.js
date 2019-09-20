/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
const path = require('path');
const webpack = require('webpack');
const {config, pathObj} = require('./config')
const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    ...config,
    mode: 'production',
    devtool: 'source-map',
    output:{
        ...config.output,
        publicPath: './',
        filename:'js/[name].[chunkhash].js',
        // 通过splitChunks抽离的js文件名格式
        chunkFilename: 'js/[name].[chunkhash].chunk.js',
    },
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
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [
                                require("autoprefixer")({
                                    "browsers": [
                                        "defaults",
                                        "not ie < 11",
                                        "last 2 versions",
                                        "> 1%",
                                        "iOS 7",
                                        "last 3 iOS versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|svgz)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'img/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        ...config.plugins,
        // 清除文件目录插件
        new CleanWebpackPlugin({
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        // 拷贝资源文件
        new copyWebpackPlugin([{
            from: path.resolve(pathObj.src,'assets'),
            to: path.resolve(pathObj.dist,'assets')
        }]),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        })
    ],
    optimization: {
        runtimeChunk: 'single', // 将runtime打包到文件中
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
        ],
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
    }
}
