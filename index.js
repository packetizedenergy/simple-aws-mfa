#!/usr/bin/env node

var shell = require('shelljs');

const mfaARN = process.argv[2];
const token = process.argv[3];

const oneHourSeconds = 60 * 60;
const durationSeconds = process.argv[4] || oneHourSeconds;

if (!mfaARN || !token){
    exit(1, `usage: aws-mfa <mfa-arn> <token>\n<mfa-arn> and <token> are required, received mfa-arn:${mfaARN} and token:${token}`);
}

const cmd = `aws sts get-session-token --serial-number ${mfaARN} --token-code=${token}`;
const response = shell.exec(`aws sts get-session-token --serial-number ${mfaARN} --token-code=${token} --duration-seconds=${durationSeconds}`, { silent : true });
if (response.code !== 0){
    exit(2, `${cmd}\n${response.code} ${response.stderr}`);
}
else {
    const payloadString = response.stdout;
    const stsResponse = JSON.parse(payloadString);
    const commands = [
        `export AWS_SECRET_ACCESS_KEY='${stsResponse.Credentials.SecretAccessKey}'`,
        `export AWS_SESSION_TOKEN='${stsResponse.Credentials.SessionToken}'`,
        `export AWS_ACCESS_KEY_ID='${stsResponse.Credentials.AccessKeyId}'`,
    ];
    console.log(commands.join('\n'));
}

function exit(code, msg){
    console.error(msg);
    process.exit(code);
}