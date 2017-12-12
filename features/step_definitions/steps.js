const { defineSupportCode } = require('cucumber');

defineSupportCode(({ defineStep }) => {
  defineStep('noop', () => {});

  defineStep('ambiguous', () => {});
  defineStep('ambiguous', () => {});

  defineStep('failed', () => { throw new Error('FAILED'); });

  defineStep('passed', () => {});

  defineStep('pending', () => 'pending');

  defineStep('skipped', () => 'skipped');
});
