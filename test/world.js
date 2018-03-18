const { describe, it } = require('mocha');
require('should');

const { exec } = require('./exec');

const args = ['--format', '.'];

describe('World', () => {
  it('should not throw colors error', () => {
    exec('features/world.feature', ...args).should.containEql(
      '\n\u001b[34mWORLD\u001b[39m\n'
    );
  });
});
