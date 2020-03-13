const openBrowser = require('react-dev-utils/openBrowser');
const apiMocker = require('mocker-api');

const { resolve } = require('./utils');

const paths = require('./paths');
const { isEnvDevelopment, isEnvProduction, shouldUseSourceMap } = require('./constants');
const plugins = require('./plugins');
const tsRules = require('./rules/tsRules');
const styleRules = require('./rules/styleRules');
const fileRules = require('./rules/fileRules');
const optimization = require('./optimization');

/**
 * @type{import('webpack').Configuration}
 * TODO:
 * 1.根据需求具体指定source-map
 * 2.开启热更新
 *
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
    entry: [paths.appEntryFile].filter(Boolean),
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
            '@services': resolve('src/services'),
            '@models': resolve('src/models'),
            '@utils': resolve('src/utils'),
            '@layouts': resolve('src/layouts')
        }
    },
    devServer: {
        compress: true,
        clientLogLevel: 'none',
        contentBase: paths.appBuild,
        transportMode: 'ws',
        injectClient: false,
        progress: true,
        hot: true,
        port: 8081,
        disableHostCheck: true,
        historyApiFallback: true, // 单页应用中当react的路由模式是BrowserRouter，historyApiFallback要设置为true,会在找不到页面的情况下跳转回index.html
        host: '0.0.0.0',
        before(app) {
            apiMocker(app, resolve('./mocker/index.js'), {
                proxy: {
                    '/api/(.*)': 'http://localhost:8081'
                },
                changeHost: true
            });
        },
        after: function() {
            openBrowser(`http://localhost:8081`);
        }
    },
    plugins,
    optimization: isEnvDevelopment ? {} : optimization,
    module: {
        rules: [...tsRules, ...styleRules, ...fileRules]
    },
    stats: {
        children: false
    }
};
