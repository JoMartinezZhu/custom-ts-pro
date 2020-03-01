const openBrowser = require('react-dev-utils/openBrowser');

const { resolve } = require('./utils');

const plugins = require('./plugins');
const tsRules = require('./rules/tsRules');
const styleRules = require('./rules/styleRules');
const fileRules = require('./rules/fileRules');

/**
 * @type{import('webpack').Configuration}
 */
module.exports = {
  entry: resolve('src/index.tsx'),
  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@pages': resolve('src/pages'),
      '@components': resolve('src/components'),
      '@store': resolve('src/store'),
      '@services': resolve('src/services'),
    },
  },
  plugins,
  module: {
    rules: [...tsRules, ...styleRules, ...fileRules],
  },
  devtool: 'source-map', // TODO:分析source-map的选择
  devServer: {
    port: 8081,
    disableHostCheck: true,
    historyApiFallback: true, // 单页应用中当react的路由模式是BrowserRouter，historyApiFallback要设置为true,会在找不到页面的情况下跳转回index.html
    host: '0.0.0.0',
    after: function() {
      openBrowser(`http://localhost:8081`);
    },
  },
};
