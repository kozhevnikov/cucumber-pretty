const { defineSupportCode } = require('cucumber');

defineSupportCode(({ Given, When, Then }) => {
  Given('foo', function () {
    console.log('foo');
  });

  When('bar', function () {
    console.log('bar');
  });

  Then('baz', function () {
    console.log('baz');
  });
});
