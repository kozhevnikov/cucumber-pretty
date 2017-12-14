const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Description', () => {
  it('should log feature description', () => {
    exec('features/description.feature', ...args).should.startWith(
      'Feature: Description\n' +
      '\n' +
      '  As a\n' +
      '  I want\n' +
      '  So that\n' +
      '\n'
    );
  });

  it('should not log scenario description', () => {
    exec('features/description.feature', ...args).should.containEql(
      '  Scenario: Description scenario\n' +
      '    When noop\n' +
      '    Then noop\n' +
      '\n' +
      '  Scenario: Description scenario outline\n' +
      '    When noop "bar"\n' +
      '    Then noop\n' +
      '\n' +
      '  Scenario: Description scenario outline\n' +
      '    When noop "baz"\n' +
      '    Then noop'
    );
  });
});
