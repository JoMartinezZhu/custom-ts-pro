const { resolve } = require('./../utils');
const { threadLoader, cacheLoader } = require('../loaders');

function getUrlLoader(assetsPrefix) {
    return {
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: `${assetsPrefix}/[name].[hash:7].[ext]`
        }
    };
}

module.exports = [
    {
        test: /\.ejs$/,
        loader: 'compile-ejs-loader',
        options: {
            beautify: true
        }
    },
    {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/,
        use: [getUrlLoader('img')]
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [getUrlLoader('fonts')]
    }
];
