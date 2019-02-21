/**
 * Author：tantingting
 * Time：2019/2/19
 * Description：Description
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};

module.exports = {
    mode: 'production', // development
    context: __dirname, //修改上下文目录
    entry: {
        index: ['@babel/polyfill', PATHS.src]
    },
    output:{
        publicPath: './',
        filename:'js/[name].[chunkhash].js',
        path: PATHS.dist
    },
    optimization: {
        runtimeChunk: 'single', // 将runtime打包到文件中
        minimizer: [ // 代码压缩
            // new UglifyJsPlugin({
            //     exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
            //     cache: true,
            //     parallel: true, // 开启并行压缩
            //     sourceMap: false,
            //     extractComments: false, // 移除注释
            //     uglifyOptions: {
            //         compress: {
            //             unused: true,
            //             warnings: false,
            //             drop_debugger: true
            //         },
            //         output: {
            //             comments: false
            //         }
            //     }
            // }),
            new TerserPlugin({
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
                    minChunks: 1, //最少被几个chunk引用
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
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: '../'
                        }
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
            },
            {
                test: /\.(html)$/, // 处理页面引入img
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: true
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([PATHS.dist], {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }), // 清除文件目录插件
        new HtmlWebpackPlugin({
            title: 'es6-test',
            template: path.join(PATHS.src, './html/index.html'),
            filename: 'index.html',
            chunks: ['index', 'vendors', 'commons', 'runtime'],
            inject: 'body',
            minify: {
                removeComments: true, //清除注释
                collapseWhitespace: true, // 清除空格换行符
                minifyCSS: true, // 压缩行内样式
                minifyJS: true, // 压缩js
                removeEmptyElements: false // 清除空元素，慎用！空元素可能用于占位，js有填充
            }
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[chunkhash].css"
        })
    ]
};
