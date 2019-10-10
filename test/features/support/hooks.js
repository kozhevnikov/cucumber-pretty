const { setWorldConstructor, BeforeAll, Before, After, AfterAll } = require('cucumber');

const World = require('./World');

setWorldConstructor(World);

if (process.argv.some((arg) => arg === 'test/features/hook.feature')) {
  BeforeAll(() => { console.log('BeforeAll'); });
  AfterAll(() => { console.log('AfterAll'); });
}

Before('@before', () => { console.log('Before'); });

After('@after', () => { console.log('After'); });
