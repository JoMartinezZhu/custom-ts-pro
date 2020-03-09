#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const program = require('commander');
const rc = require('rc');
const uploadrc = rc('upload');

program.usage('./bin [options] <command>');

program
    .command('release')
    .description('生产模式')
    .action(releaseCmd);

program
    .command('build')
    .description('构建模式')
    .action(buildCmd);

program.parse(process.argv);

function buildCmd() {
    execSync('npm run build', { stdio: 'inherit' });
    process.exit();
}

async function releaseCmd() {
    await setPrivateVariable();
    buildCmd();
    require('upload_qianjin').upload();
    resetUploadrc();
    process.exit();
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
