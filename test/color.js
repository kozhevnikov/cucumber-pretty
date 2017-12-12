const { describe, it } = require('mocha');
require('should');

const { exec } = require('./exec');

const args = ['--format', '.'];

describe('Color', () => {
  it('should color feature keyword', () => {
    exec('features/feature.feature', '--name', 'Feature name', ...args).should.containEql(
      '\u001b[1m\u001b[35m' +
      'Feature' +
      '\u001b[39m\u001b[22m' +
      ': Feature\n'
    );
  });

  it('should color scenario keyword', () => {
    exec('features/scenario.feature', '--name', 'Scenario name', ...args).should.containEql(
      '\u001b[1m\u001b[35m' +
      'Scenario' +
      '\u001b[39m\u001b[22m' +
      ': Scenario name\n'
    );
  });

  it('should color step keywords', () => {
    exec('features/step.feature', '--name', 'Step name', ...args).should.containEql(
      '    \u001b[34mWhen\u001b[39m noop\n' +
      '    \u001b[34mThen\u001b[39m noop\n'
    );
  });
});
