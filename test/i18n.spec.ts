import 'should'

import { run } from './exec'

describe('Internationalization', () => {
  it('logs French', () => {
    run('fr.feature', {
      '--name': 'Nom du Scénario',
    }).should.startWith(
      'Fonctionnalité: Nom de la Fonctionnalité # test/features/fr.feature:2\n' +
        '\n' +
        '  Scénario: Nom du Scénario # test/features/fr.feature:4\n' +
        '    Quand noop\n' +
        '    Alors noop\n'
    )
  })

  it('logs Russian', () => {
    run('ru.feature', { '--name': 'Сценарий name' }).should.startWith(
      'Функция: Функция Name # test/features/ru.feature:2\n' +
        '\n' +
        '  Сценарий: Сценарий name # test/features/ru.feature:4\n' +
        '    Когда noop\n' +
        '    Тогда noop\n'
    )
  })
})
