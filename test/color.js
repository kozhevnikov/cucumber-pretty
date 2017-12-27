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
      '    \u001b[1mWhen\u001b[22m noop\n' +
      '    \u001b[1mThen\u001b[22m noop\n'
    );
  });

  it('should color ambiguous step', () => {
    exec('features/step.feature', '--name', 'Ambiguous step', ...args).should.containEql(
      '    \u001b[31m✖ ambiguous\u001b[39m\n'
    );
  });

  it('should color failed step', () => {
    exec('features/step.feature', '--name', 'Failed step', ...args).should.containEql(
      '    \u001b[31m✖ failed\u001b[39m\n'
    );
  });

  it('should color pending step', () => {
    exec('features/step.feature', '--name', 'Pending step', ...args).should.containEql(
      '    \u001b[33m? pending\u001b[39m\n'
    );
  });

  it('should color skipped step', () => {
    exec('features/step.feature', '--name', 'Skipped step', ...args).should.containEql(
      '    \u001b[36m- skipped\u001b[39m\n'
    );
  });

  it('should color undefined step', () => {
    exec('features/step.feature', '--name', 'Undefined step', ...args).should.containEql(
      '    \u001b[33m? undefined\u001b[39m\n'
    );
  });

  it('should color error', () => {
    exec('features/step.feature', '--name', 'Failed step', ...args).should.containEql(
      '    \u001b[31mError: FAILED'
    );
  });

  it('should color feature tag', () => {
    exec('features/tag.feature', '--name', 'Feature tag', ...args).should.containEql(
      '\u001b[36m@feature @tag\u001b[39m\n'
    );
  });

  it('should color scenario tag', () => {
    exec('features/tag.feature', '--name', 'Scenario tag', ...args).should.containEql(
      '\u001b[36m@feature @tag @scenario\u001b[39m\n'
    );
  });
});
