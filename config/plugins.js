const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const { isEnvDevelopment, isEnvProduction, getClientEnvironment } = require('./constants');
const env = getClientEnvironment();
const paths = require('./paths');

module.exports = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        inject: true,
        template: paths.appHtml,
        ...env.raw
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
    isEnvProduction &&
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
    isEnvProduction &&
        new FilterWarningsPlugin({
            exclude: /mini-css-extract-plugin[^]*Conflicting order/
        })
].filter(Boolean);
