'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    dotenv: resolveApp('config/dotenv'),
    appPath: resolveApp('.'),
    appBuild: resolveApp('dist'),
    appHtml: resolveApp('config/tpl/index.ejs'),
    appEntryFile: resolveApp('src/index.tsx'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appNodeModules: resolveApp('node_modules')
};
