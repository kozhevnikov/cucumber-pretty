const { execFileSync } = require('child_process');

exports.args = ['--format', '.', '--format-options', JSON.stringify({ colorsEnabled: false })];

exports.exec = (...args) => {
  const stdout = execFileSync('node_modules/cucumber/bin/cucumber.js', args).toString();
  console.log(stdout); // eslint-disable-line no-console
  return stdout;
};
