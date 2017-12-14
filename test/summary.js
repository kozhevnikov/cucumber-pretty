const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Summary', () => {
  it('should log empty summary', () => {
    exec('features', '--tags', '@empty', ...args).should.equal(
      '0 scenarios\n' +
      '0 steps\n' +
      '0m00.000s\n'
    );
  });

  it('should log new line', () => {
    exec('features/feature.feature', '--name', 'Feature name', ...args)
      .replace(/0m00\.\d+s/, '0m00.000s')
      .should.equal(
        'Feature: Feature\n' +
        '\n' +
        '  Scenario: Feature name\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '1 scenario (1 passed)\n' +
        '2 steps (2 passed)\n' +
        '0m00.000s\n'
      );
  });
});
