import 'should'

import { run } from './exec'

describe('Internationalization', () => {
  it('logs French', () => {
    run('fr.feature', {
      '--name': 'Nom du Scénario',
    }).should.startWith(
      'Fonctionnalité: Nom de la Fonctionnalité\n' +
        '\n' +
        '  Scénario: Nom du Scénario\n' +
        '    Quand noop\n' +
        '    Alors noop\n'
    )
  })

  it('logs Russian', () => {
    run('ru.feature', { '--name': 'Сценарий name' }).should.startWith(
      'Функция: Функция Name\n' +
        '\n' +
        '  Сценарий: Сценарий name\n' +
        '    Когда noop\n' +
        '    Тогда noop\n'
    )
  })
})
