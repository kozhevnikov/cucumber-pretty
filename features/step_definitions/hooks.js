/* eslint-disable no-console */
const { defineSupportCode } = require('cucumber');

defineSupportCode(({ BeforeAll, Before, After, AfterAll }) => {
  if (process.argv.some(arg => arg === 'features/hook.feature')) {
    BeforeAll('@before-all', () => { console.log('BeforeAll'); });
    AfterAll('@after-all', () => { console.log('AfterAll'); });
  }

  Before('@before', () => { console.log('Before'); });

  After('@after', () => { console.log('After'); });
});
