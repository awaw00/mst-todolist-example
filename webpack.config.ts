import * as path from 'path';
import { WebpackOptions } from 'webpack/declarations/WebpackOptions';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FixDefaultImportPlugin = require('webpack-fix-default-import-plugin');

const config: WebpackOptions = {
  mode: (process.env.NODE_ENV || 'development') as any,
  context: __dirname,
  entry: {
    app: './src/index.tsx',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new FixDefaultImportPlugin()
  ],
  stats: {
    children: false,
    exclude: /(node_modules|\(webpack\))/,
  },
  devServer: {
    port: process.env.NODE_ENV || 10080,
    stats: {
      children: false,
      exclude: /(node_modules|\(webpack\))/,
    },
  },
};

export default config;
