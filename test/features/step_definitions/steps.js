const { defineSupportCode } = require('cucumber');

defineSupportCode(({ defineStep, BeforeAll, Before, After, AfterAll, registerHandler }) => {
  defineStep(/^step (.*)$/, function (step) {
    log('step', step);
  });

  defineStep(/^example "(.*)"$/, function (example) {
    log('example', example);
  });

  defineStep(/^table$/, function (table) {
    log('table', table);
  });

  defineStep(/^docstring$/, function (docstring) {
    log('docstring', docstring);
  });

  defineStep(/^passed$/, function () {
    log('passed');
  });

  defineStep(/^pending/, function () {
    return 'pending'
  });

  defineStep(/^error$/, function () {
    throw new Error();
  });

  defineStep(/^ambiguous$/, function () { });
  defineStep(/^ambiguous$/, function () { });

  Before(() => log(('before')));
  After(() => log(('after')));

  BeforeAll(() => log(('before all')));
  AfterAll(() => log(('after all')));

  // registerHandler('BeforeFeatures', () => log('before features'));
  // registerHandler('AfterFeatures', () => log('after features'));

  function log(message, ...args) {
    // console.log(message, ...args);
    // console.log(`${new Date().toISOString()} DEBUG [steps] ${message}`, ...args);
  }
});
