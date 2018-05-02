const { describe, it } = require('mocha');
require('should');

const { exec, args } = require('./exec');

describe('Internationalization', () => {
  it('should log French', () => {
    exec('test/features/fr.feature', '--name', 'Scénario name', ...args).should.startWith(
      'Fonctionnalité: Fonctionnalité Name\n' +
      '\n' +
      '  Scénario: Scénario name\n' +
      '    Quand noop\n' +
      '    Alors noop\n'
    );
  });

  it('should log Russian', () => {
    exec('test/features/ru.feature', '--name', 'Сценарий name', ...args).should.startWith(
      'Функция: Функция Name\n' +
      '\n' +
      '  Сценарий: Сценарий name\n' +
      '    Когда noop\n' +
      '    Тогда noop\n'
    );
  });
});
