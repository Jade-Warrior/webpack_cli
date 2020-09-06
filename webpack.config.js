const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { compilation } = require('webpack');
const node_env = process.env.NODE_ENV || 'production';
const isDev = node_env === 'development';

const config = {
  entry: {
    main: path.resolve('src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.js', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  mode: node_env,
  devtool: isDev ? 'eval-cheap-module-source-map' : 'none',
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: [
        {
          loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        }, {
          loader: 'css-loader', options: {
            sourceMap: isDev
          }
        },
        {
          loader: 'sass-loader', options: {
            sourceMap: isDev
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')],
          }
        }
      ]
    }, {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
        },
      },
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: path.resolve('node_modules'),
    }, {
      test: /\.js$/,
      use: 'eslint-loader',
      exclude: path.resolve('node_modules'),
      enforce: 'pre'
    }],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'cc',
      template: path.resolve('src/index.html'),
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(node_env),
    }),
  ],
};

if (isDev) {
  // development
  config.devServer = {
    contentBase: './public',
    hotOnly: true,
    port: 3000,
    overlay: true,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {'^/api': ''},
        changeOrigin: true,
      }
    }
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
  );
} else {
  // production
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new CopyWebpackPlugin({
      patterns: ['public'],
    }),
  );
}

module.exports = config;
