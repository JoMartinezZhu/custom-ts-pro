const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { resolve } = require('../utils');
const { cacheLoader, threadLoader } = require('../loaders');

const typingsForCssModulesLoaderConf = {
  loader: '@teamsupercell/typings-for-css-modules-loader',
  options: {
    formatter: 'prettier',
  },
};

module.exports = [
  {
    test: /\.scss$/,
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader,
      cacheLoader,
      threadLoader(2),
      typingsForCssModulesLoaderConf,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[hash:base64:8]',
          },
          sourceMap: true,
          importLoaders: 2,
          localsConvention: 'camelCase',
        },
      },
      {
        loader: 'sass-loader',
        options: { includePaths: [resolve('src/styles')] },
      },
    ],
  },
  {
    test: /\.less$/,
    use: [
      // 'style-loader',
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
        },
      },
    ],
  },
];
