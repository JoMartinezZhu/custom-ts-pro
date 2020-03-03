const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const { resolve } = require('./utils');

module.exports = [
    // new MiniCssExtractPlugin({
    //     // Options similar to the same options in webpackOptions.output
    //     filename: '[name].[contenthash].css',
    //     chunkFilename: '[name].[contenthash].css'
    // }),
    new HtmlWebpackPlugin({
        template: resolve('build/tpl/index.ejs')
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    // new HardSourceWebpackPlugin()
];
