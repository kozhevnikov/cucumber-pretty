const { defineSupportCode } = require('cucumber');

defineSupportCode(({ defineStep }) => {
  defineStep('noop', () => {});
});
