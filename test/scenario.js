const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Scenario', () => {
  it('should log scenario name', () => {
    exec('features/scenario.feature', '--name', 'Scenario', ...args).should.containEql('  Scenario: Scenario name\n');
  });
});
