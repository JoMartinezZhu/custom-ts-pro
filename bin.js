#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

const program = require('commander');

const rc = require('rc');

const uploadrc = rc('upload');

const packageLib = require('./package.json');

program.version(packageLib.version).usage('./bin [options] <command>');

program
    .command('dev')
    .description('开发者模式')
    .action(devCmd);

program
    .command('release')
    .description('生产模式')
    .action(releaseCmd);

program
    .command('build')
    .description('构建模式')
    .action(buildCmd);

program.parse(process.argv);

function devCmd() {
    console.log(process.env.TARGET);
    // execSync('npm run dev', { stdio: 'inherit' });
}

function buildCmd() {
    setEnvVariable();
    execSync('npm run build:webpack', { stdio: 'inherit' });
}

async function releaseCmd() {
    await setPrivateVariable();
    buildCmd();
    require('upload_qianjin').upload();
    resetUploadrc();
}

function setPrivateVariable() {
    return new Promise(resolve => {
        fs.readFile('/app/config/learnta/fe/keystore.rc', (err, data) => {
            if (err) throw err;
            const result = JSON.stringify({ ...JSON.parse(data).upload.ali, ...uploadrc });
            fs.writeFile('./.uploadrc', result, () => resolve());
        });
    });
}

function resetUploadrc() {
    fs.writeFile('./.uploadrc', uploadrc, () => console.log('reset .uploadrc success'));
}
