/* eslint-disable no-console */
const { execFileSync } = require('child_process');

const cmd = 'node_modules/cucumber/bin/cucumber-js';

exports.args = ['--format', '.', '--format-options', JSON.stringify({ colorsEnabled: false })];

exports.exec = (...args) => {
  console.log(`${cmd} ${args.join(' ')}`);

  let stdout;
  try {
    stdout = execFileSync(cmd, args).toString();
  } catch (error) {
    stdout = error.stdout.toString();
  }

  console.log(stdout);
  return stdout;
};
