import 'should'

import { args, exec } from './exec'

describe('Internationalization', () => {
  it('should log French', () => {
    exec(
      'test/features/fr.feature',
      '--name',
      'Nom du Scénario',
      ...args
    ).should.startWith(
      'Fonctionnalité: Nom de la Fonctionnalité\n' +
        '\n' +
        '  Scénario: Nom du Scénario\n' +
        '    Quand noop\n' +
        '    Alors noop\n'
    )
  })

  it('should log Russian', () => {
    exec(
      'test/features/ru.feature',
      '--name',
      'Сценарий name',
      ...args
    ).should.startWith(
      'Функция: Функция Name\n' +
        '\n' +
        '  Сценарий: Сценарий name\n' +
        '    Когда noop\n' +
        '    Тогда noop\n'
    )
  })
})
