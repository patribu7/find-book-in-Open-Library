'use strict'

const path = require('path');
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/app.js'),
  },
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'deploy'),
    clean: true
  },
  devServer: {
    static: './deploy',
    open: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            // Extracts CSS for each JS file that includes CSS
            loader: miniCssExtractPlugin.loader
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer
                ]
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/template.html"),
      title: "trova libri in Open Library",
      filename: 'index.html',
    }),
    new miniCssExtractPlugin(),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),

    new Dotenv(),

    new CleanWebpackPlugin()
  ],
};