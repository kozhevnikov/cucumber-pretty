const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Summary', () => {
  it('should log empty summary', () => {
    exec('features', '--tags', '@empty', ...args).should.equal(
      '0 scenarios\n' +
      '0 steps\n' +
      '0m00.000s\n'
    );
  });
});
