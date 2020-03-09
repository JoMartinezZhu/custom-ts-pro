const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const postcssNormalize = require('postcss-normalize');

// const { resolve } = require('../utils');
const { cacheLoader, threadLoader } = require('../loaders');

const { isEnvDevelopment, isEnvProduction, shouldUseSourceMap } = require('../constants');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && MiniCssExtractPlugin.loader,
        cacheLoader,
        {
            loader: require.resolve('css-loader'),
            options: cssOptions
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {
                            flexbox: 'no-2009'
                        },
                        stage: 3
                    }),
                    postcssNormalize()
                ],
                sourceMap: isEnvProduction && shouldUseSourceMap
            }
        }
    ].filter(Boolean);
    if (preProcessor) {
        loaders.push({
            loader: require.resolve(preProcessor),
            options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
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
            sourceMap: isEnvProduction && shouldUseSourceMap
        }),
        sideEffects: true
    },
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders(
            {
                importLoaders: 2,
                sourceMap: isEnvProduction && shouldUseSourceMap
            },
            'less-loader'
        ),
        sideEffects: true
    },
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
