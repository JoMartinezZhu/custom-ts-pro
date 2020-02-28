const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = [
  new HtmlWebpackPlugin({
    template: 'build/tpl/index.ejs',
  }),
  new HardSourceWebpackPlugin(),
];
