const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Feature', () => {
  it('should log feature name', () => {
    exec('features/feature.feature', '--name', 'Feature', ...args).should.startWith('Feature: Feature Name\n');
  });
});
