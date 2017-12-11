/* eslint-disable no-console */
const { execFileSync } = require('child_process');

const cmd = 'node_modules/cucumber/bin/cucumber.js';

exports.args = ['--format', '.', '--format-options', JSON.stringify({ colorsEnabled: false })];

exports.exec = (...args) => {
  console.log(`${cmd} ${args.join(' ')}`);

  let stdout;
  try {
    stdout = execFileSync(cmd, args).toString();
    return stdout;
  } catch (error) {
    stdout = error.stdout.toString();
    throw new Error(stdout);
  } finally {
    console.log(stdout);
  }
};
