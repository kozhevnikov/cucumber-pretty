const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Tag', () => {
  it('should log feature tag', () => {
    exec('features/tag.feature', '--name', 'Tag', ...args).should.startWith(
      '@feature @tag\n' +
      'Feature: Tag\n'
    );
  });

  it('should log scenario tag');
});
