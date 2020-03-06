const openBrowser = require('react-dev-utils/openBrowser');

const { resolve } = require('./utils');
// const ignoredFiles = require('react-dev-utils/ignoredFiles');
// const { choosePort, createCompiler, prepareProxy, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
// const { checkBrowsers } = require('react-dev-utils/browsersHelper');

const paths = require('./paths');
const constants = require('./constants');
const plugins = require('./plugins');
const tsRules = require('./rules/tsRules');
const styleRules = require('./rules/styleRules');
const fileRules = require('./rules/fileRules');
const optimization = require('./optimization');

const { isEnvDevelopment, isEnvProduction, shouldUseSourceMap } = constants;
/**
 * @type{import('webpack').Configuration}
 */
module.exports = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    bail: isEnvProduction,
    devtool: isEnvProduction
        ? shouldUseSourceMap
            ? 'source-map'
            : false
        : isEnvDevelopment && 'cheap-module-source-map',
    entry: paths.appEntryFile,
    entry: [isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appEntryFile].filter(
        Boolean
    ),
    output: {
        path: paths.appBuild,
        filename: isEnvDevelopment ? '[name].js' : '[name].[contenthash:8].js',
        chunkFilename: isEnvDevelopment ? '[name].chunk.js' : '[name].[contenthash].chunk.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@pages': resolve('src/pages'),
            '@components': resolve('src/components'),
            '@store': resolve('src/store'),
            '@services': resolve('src/services'),
            '@models': resolve('src/models'),
            '@utils': resolve('src/utils'),
            '@layouts': resolve('src/layouts')
        }
    },
    plugins,
    optimization: isEnvDevelopment ? {} : optimization,
    module: {
        rules: [...tsRules, ...styleRules, ...fileRules]
    },
    devServer: {
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appBuild,
        transportMode: 'ws',
        injectClient: false,
        progress: true,
        port: 8081,
        disableHostCheck: true,
        historyApiFallback: true, // 单页应用中当react的路由模式是BrowserRouter，historyApiFallback要设置为true,会在找不到页面的情况下跳转回index.html
        host: '0.0.0.0',
        after: function() {
            openBrowser(`http://localhost:8081`);
        }
    }
};
