const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

const { isEnvDevelopment, isEnvProduction, getClientEnvironment } = require('./constants');
const env = getClientEnvironment();
const paths = require('./paths');

const HardSource = require('hard-source-webpack-plugin');
module.exports = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml
    }),
    new webpack.DefinePlugin(env.stringified),
    isEnvProduction &&
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: '[name].[contenthash].chunk.css'
        }),
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
    isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    isEnvProduction && new HardSource()
].filter(Boolean);
