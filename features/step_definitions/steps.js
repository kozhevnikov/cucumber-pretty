const { defineSupportCode } = require('cucumber');

defineSupportCode(({ defineStep }) => {
  defineStep('noop', () => {});

  defineStep('noop {string}', (noop) => {}); // eslint-disable-line no-unused-vars

  defineStep('ambiguous', () => {});
  defineStep('ambiguous', () => {});

  defineStep('failed', () => { throw new Error('FAILED'); });

  defineStep('passed', () => {});

  defineStep('pending', () => 'pending');

  defineStep('skipped', () => 'skipped');

  defineStep('doc string', (noop) => {}); // eslint-disable-line no-unused-vars
});
