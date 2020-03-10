const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}` // webpack运行环境(模块解析和加载)和模块信息清单 单独打包出来
    },
    usedExports: true,
    splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        cacheGroups: {
            commons: {
                name: 'commons',
                chunks: 'initial',
                test: /[\\/]node_modules[\\/]/
            },
            antd: {
                name: 'antd',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/,
                priority: 9
            },
            vendor: {
                name: 'vendor',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](moment|axios)/,
                minChunks: 1,
                priority: 10
            }
        }
    },
    minimizer: [
        new TerserWebpackPlugin({ cache: true, parallel: true }),
        new OptimizeCssAssetsWebpackPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                safe: true,
                autoprefixer: false,
                discardComments: { removeAll: true }
            },
            canPrint: true
        })
    ]
};
