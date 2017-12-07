const { execFileSync } = require('child_process');

exports.args = ['--format', '.', '--format-options', JSON.stringify({ colorsEnabled: false })];

exports.exec = (...args) => execFileSync('node_modules/cucumber/bin/cucumber.js', args).toString();
