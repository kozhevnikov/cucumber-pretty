const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Scenario', () => {
  it('should log scenario name', () => {
    exec('test/features/scenario.feature', '--name', 'Scenario name', ...args)
      .should.containEql('  Scenario: Scenario name\n');
  });

  it('should log new lines', () => {
    exec('test/features/scenario.feature', '--name', 'Scenario \\d', ...args).should.containEql(
      'Feature: Scenario\n' +
      '\n' +
      '  Scenario: Scenario 1\n' +
      '    When noop\n' +
      '    Then noop\n' +
      '\n' +
      '  Scenario: Scenario 2\n' +
      '    When noop\n' +
      '    Then noop\n'
    );
  });
});
