const path = require('path');
const glob = require('glob');
const projectConfig = require('./project.config.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const projectConfigReg = {};
Object.keys(projectConfig).forEach((key) => {
  projectConfigReg[key] = new RegExp(projectConfig[key].join('|'));
});
const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {},
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[hash].[chunkhash:8].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
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
    ],
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
  plugins: [],
};
/**
 * 增加img file rule
 */
const imgExcludeArr = [];
if (projectConfig.fileImg.length > 0) {
  imgExcludeArr.push(projectConfigReg.fileImg);
  config.module.rules.push({
    test: projectConfigReg.fileImg,
    loader: 'file-loader',
    options: {
      name: 'img/[name].[hash:8][ext]',
    },
  });
}
if (projectConfig.base64Img.length > 0) {
  imgExcludeArr.push(projectConfigReg.base64Img);
  config.module.rules.push({
    test: projectConfigReg.base64Img,
    loader: 'url-loader',
    options: {
      name: 'img/[name].[hash:8][ext]',
      limit: 0,
    },
  });
}
const imgRule = {
  test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf)$/,
  loader: 'url-loader',
  options: {
    name: 'img/[name].[hash:8].[ext]',
    limit: 10240,
  },
};
if (imgExcludeArr.length > 0) {
  imgRule.exclude = { and: imgExcludeArr };
}
config.module.rules.push(imgRule);
/**
 * 增加css file rule -----> 待扩展sass、less
 * css 作为最后一个rule，方便在dev config中对其进行修改
 */
const cssExcludeArr = [];
if (projectConfig.inlineCss.length > 0) {
  cssExcludeArr.push(projectConfigReg.inlineCss);
  config.module.rules.append({
    test: projectConfigReg.inlineCss,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
    ],
  });
}
let defLoader = [
    'css-loader',
    'postcss-loader'
]
if (process.env.NODE_ENV === 'production') {
    defLoader = [
        {
            loader: MiniCssExtractPlugin.loader
        },
        ...defLoader
    ]
} else {
    defLoader = [
        'style-loader',
        ...defLoader
    ]
}
const cssRule = {
    test: /\.css$/,
    use: defLoader
};
if (cssExcludeArr.length > 0) {
  cssRule.exclude = { and: cssExcludeArr };
}
config.module.rules.push(cssRule);

const scssRule = {
    test: /\.(sc|sa)ss$/,
    use: [
        ...defLoader,
        'sass-loader'
    ]
};
config.module.rules.push(scssRule);

const entries = projectConfig.specialEntry.concat(glob.sync('./src/js/page/*.*'));
entries.forEach((item) => {
  const chunkName = path.basename(item).split('.')[0];
  config.entry[chunkName] = [item.replace(/\/src/, '')];
});

module.exports = config;
