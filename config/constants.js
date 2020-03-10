const getClientEnvironment = require('./env');

const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isEnvProduction = process.env.NODE_ENV === 'production';
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';
// const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

module.exports = {
    isEnvDevelopment,
    isEnvProduction,
    shouldUseSourceMap,
    getClientEnvironment
};
