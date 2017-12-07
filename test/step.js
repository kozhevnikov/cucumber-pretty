const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Step', () => {
  it('should log step', () => {
    exec('features/step.feature', '--name', 'Step', ...args).should.containEql(
      '    Given noop\n' +
      '    When noop\n' +
      '    Then noop\n' +
      '    And noop\n' +
      '    But noop\n'
    );
  });
});
