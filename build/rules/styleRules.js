// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const { resolve } = require('../utils');
const { cacheLoader, threadLoader } = require('../loaders');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: cssOptions
        }
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: true,
                javascriptEnabled: true
            }
        });
    }
    return loaders;
};

module.exports = [
    {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
            importLoaders: 1,
            sourceMap: true
        }),
        sideEffects: true
    },
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: true
            },
            'less-loader'
        ),
        sideEffects: true
    },
    // using the extension .module.less
    {
        test: lessModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: true,
                modules: {
                    getLocalIdent: getCSSModuleLocalIdent
                }
            },
            'less-loader'
        )
    }
];
