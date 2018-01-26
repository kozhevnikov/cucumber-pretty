/* eslint-disable no-console */
const { BeforeAll, Before, After, AfterAll } = require('cucumber');

if (process.argv.some(arg => arg === 'features/hook.feature')) {
  BeforeAll(() => { console.log('BeforeAll'); });
  AfterAll(() => { console.log('AfterAll'); });
}

Before('@before', () => { console.log('Before'); });

After('@after', () => { console.log('After'); });
