const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Doc String', () => {
  it('should log doc string', () => {
    exec('features/doc-string.feature', ...args).should.containEql(
      '    When doc string\n' +
      '      """\n' +
      '      foo\n' +
      '      bar\n' +
      '      """\n'
    );
  });
});
