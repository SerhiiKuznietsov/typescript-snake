'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');


const DEV_MODE = 'development';
const PROD_MODE = 'production';
const envMode = process.env.NODE_ENV || DEV_MODE;
const isDev = process.env.NODE_ENV === DEV_MODE;
const isProd = !isDev;

const styleLoaders = (extra = []) => {
  return ['style-loader', 'css-loader', ...extra]
};

module.exports = () => {
  return {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js'
    },
    devServer: {
      devMiddleware: {
        writeToDisk: true,
      },
      // static: {
      //   directory: path.join(__dirname, 'str/public'),
      // },
      watchFiles: ['dist/**/*'],
      open: true,
      compress: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
          runtimeErrors: true,
        },
        progress: true,
        logging: 'info',
      },
      headers: {
        'X-Custom-Foo': 'bar',
      },
      hot: true,
      https: false,
    },
    devtool: 'inline-source-map',
    mode: envMode,
    resolve: {
      extensions: ['.js', '.json', '.ts'],
      // modules: ['node_modules'],
    },
    module: {
      rules: [
        {
        test: /\.css$/,
        use: styleLoaders()
        },
        {
          test: /\.vox$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                publicPath: './src/static',
              },
            },
          ],
        },
        {
          test: /\.m?js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          ]
        },
        {
          test: /\.ts$/,
          exclude: [/node_modules/],
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                // transpileOnly: true,
                configFile: './tsconfig.json'
              },
            },
          },
        },
      ]
    },
    plugins: [
      new webpack.ProgressPlugin(),
      // new HtmlWebpackPlugin({
      //   filename: 'index.[contenthash].html',
      //   template: 'index.ejs',
      //   minify: {
      //     collapseWhitespace: true,
      //     minifyCSS: true,
      //     removeComments: true,
      //   },
      //   title: isDev ? 'Development' : 'Snake game',
      //   description: 'description',
      //   // logo: path.basename(globalEnv.app.logo),
      // }),
      new HtmlWebpackPlugin(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      runtimeChunk: 'single',
    },
  };
};