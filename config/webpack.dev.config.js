const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname, '../');
const SRC_PATH = path.resolve(ROOT_PATH, 'src');

const cdnPath = '/';

module.exports = {
  mode: 'development',
  context: SRC_PATH,
  // 定义能够被打包的文件，文件后缀名
  resolve: {
    // 模块目录
    modules: ['node_modules', 'common'],
    extensions: ['.js'],
    alias: {
      src: SRC_PATH,
    },
  },
  entry: {
    index: 'src/index.js',
  },
  output: {
    publicPath: cdnPath,
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?cacheDirectory',
      },
    },
    { // css loader
      test: /\.css$/,
      include: SRC_PATH,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }, { // less loader
      test: /\.less$/,
      include: SRC_PATH,
      use: ['style-loader', 'css-loader', 'postcss-loader', {
        loader: 'less-loader',
        options: {
          importLoaders: 1,
        }
      }]
    }, { // 业务样式, css module
      test: /\.less$/,
      include: SRC_PATH,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]_[hash:base64:8]',
        },
      }, 'postcss-loader', 'less-loader?javascriptEnabled'],
    },
    { // 加载图片
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: 'img/[name].[hash:base64:8].[ext]',
      },
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html'),
      favicon: path.resolve(SRC_PATH, 'favicon.ico'),
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: false
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 2000,
    historyApiFallback: true,
    open: true,
    host: "0.0.0.0",
    proxy: {
      '/api/*': {
        target: 'https://api.weixin.qq.com/cgi-bin',
        secure: false,
        changeOrigin: true,
      },
    },
  },

}