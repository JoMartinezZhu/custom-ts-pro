const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const { resolve } = require('./utils');
const { isEnvDevelopment, isEnvProduction, shouldUseSourceMap, getClientEnvironment } = require('./constants');

module.exports = [
    new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
                inject: true,
                template: paths.appHtml
            },
            isEnvProduction
                ? {
                      minify: {
                          removeComments: true,
                          collapseWhitespace: true,
                          removeRedundantAttributes: true,
                          useShortDoctype: true,
                          removeEmptyAttributes: true,
                          removeStyleLinkTypeAttributes: true,
                          keepClosingSlash: true,
                          minifyJS: true,
                          minifyCSS: true,
                          minifyURLs: true
                      }
                  }
                : undefined
        )
    ),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
    // new HardSourceWebpackPlugin()
];
