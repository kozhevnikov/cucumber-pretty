const { defineSupportCode } = require('cucumber');

defineSupportCode(({ defineStep, BeforeAll, Before, After, AfterAll, registerHandler }) => {
  defineStep(/^step (.*)$/, function (step) {
    console.log(step);
  });

  defineStep(/^example "(.*)"$/, function (example) {
    console.log('example', example);
  });

  defineStep(/^table$/, function (table) {
    console.log('table', table);
  });

  defineStep(/^docstring$/, function (docstring) {
    console.log('docstring', docstring);
  });

  Before(() => console.log(('before')));
  After(() => console.log(('after')));

  BeforeAll(() => console.log(('before all')));
  AfterAll(() => console.log(('after all')));

  // registerHandler('BeforeFeatures', () => console.log('before features'));
  // registerHandler('AfterFeatures', () => console.log('after features'));
});
