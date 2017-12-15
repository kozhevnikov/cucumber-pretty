const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Tag', () => {
  it('should log feature tag', () => {
    exec('features/tag.feature', '--name', 'Feature tag', ...args).should.startWith(
      '@feature @tag\n' +
      'Feature: Tag\n'
    );
  });

  it('should log scenario tag', () => {
    exec('features/tag.feature', '--name', 'Scenario tag', ...args).should.containEql(
      '  @feature @tag @scenario\n' +
      '  Scenario: Scenario tag\n'
    );
  });

  it('should log scenario outline tag', () => {
    exec('features/tag.feature', '--name', 'Scenario outline tag', ...args).should.containEql(
      '  @feature @tag @scenario-outline @example\n' +
      '  Scenario Outline: Scenario outline tag\n'
    );
  });
});
