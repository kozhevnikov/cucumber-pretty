const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Data Table', () => {
  it('should log data table', () => {
    exec('features/data-table.feature', ...args).should.containEql(
      '    When data table\n' +
      '      │ foo   │ bar   │\n' +
      '      │ lorem │ ipsum │\n'
    );
  });
});
