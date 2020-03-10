const { resolve } = require('../utils');
const { cacheLoader, threadLoader } = require('../loaders');
/**
 * @type{import('webpack').Configuration // 使得在编写webpack的时候有配置项提醒
 */

module.exports = [
    {
        test: /\.tsx?$/,
        include: resolve('src'),
        use: [
            cacheLoader,
            threadLoader(),
            {
                loader: 'babel-loader',
                options: {
                    babelrc: false,
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: 3
                            }
                        ],
                        '@babel/preset-typescript',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }],
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-syntax-optional-chaining',
                        ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }]
                    ]
                }
            }
        ]
    }
];