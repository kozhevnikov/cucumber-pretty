const { describe, it } = require('mocha');
require('should');

const exec = require('./exec');

const args = ['--format', '.'];

describe('Summary', () => {
  it('empty summary', () => {
    exec('features', '--tag', '@empty', ...args).should.equal(
      '0 scenarios\n' +
      '0 steps\n' +
      '0m00.000s\n'
    );
  });
});
