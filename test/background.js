const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Background', () => {
  it('should not log background', () => {
    exec('features/background.feature', ...args).should.startWith(
      'Feature: Background\n' +
      '\n' +
      '  Scenario: Background scenario\n' +
      '    Given noop\n' +
      '    When noop\n' +
      '    Then noop\n' +
      '\n' +
      '  Scenario Outline: Background scenario outline\n' +
      '    Given noop\n' +
      '    When noop "bar"\n' +
      '    Then noop\n' +
      '\n' +
      '  Scenario Outline: Background scenario outline\n' +
      '    Given noop\n' +
      '    When noop "baz"\n' +
      '    Then noop'
    );
  });
});
