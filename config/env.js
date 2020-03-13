'use strict';
/**
 * 环境变量：
 * REACT_APP:项目名称，与组成 publicUrl相关，查看.uploaderc
 * NODE_ENV：development、production ，表示 webpack 打包是什么模式
 * 下面的变量以 REACT_APP_ 为前缀
 * TARGET：t1、t2、t3、staging、prod，表示测试环境，prod 表示正服，与组成 publicUrl相关，查看.uploaderc
 * DOMAIN：后端接口域名，如：https://www.baidu.com
 */

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const targets = ['t1', 't2', 't3', 'staging', 'prod'];
const NODE_ENV = process.env.NODE_ENV;
const TARGET = process.env.TARGET;
if (!NODE_ENV) {
    throw new Error('The NODE_ENV environment variable is required but was not specified.');
}

if (!TARGET || !targets.includes(TARGET)) {
    throw new Error(`The TARGET environment variable is required and should be ${targets.join(',')}`);
}

const dotenvFiles = [`${paths.dotenv}.${TARGET}.local.env`, `.${TARGET}.env`, '.env'].filter(Boolean);

dotenvFiles.forEach(dotenvFile => {
    const path = resolveApp(`${paths.dotenv}${dotenvFile}`);
    if (fs.existsSync(path)) {
        require('dotenv').config({ path });
    }
});

const localEnvpath = resolveApp('.local.env');
if (fs.existsSync(localEnvpath)) {
    require('dotenv').config({ path: localEnvpath });
}

const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment() {
    const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                REACT_APP: require(paths.appPackageJson).name,
                NODE_ENV: process.env.NODE_ENV || 'development'
            }
        );

    // Stringify all values so we can feed into webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {})
    };

    console.log('stringified', stringified);
    return { raw, stringified };
}

module.exports = getClientEnvironment;
