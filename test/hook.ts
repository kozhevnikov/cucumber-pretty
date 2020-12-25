import 'should'

import { args, exec } from './exec'

describe('Hook', () => {
  it('should not log hook', () => {
    exec('test/features/hook.feature', ...args).should.startWith(
      'BeforeAll\n' +
        'Feature: Hook\n' +
        '\n' +
        '  @before @after\n' +
        '  Scenario: Hook\n' +
        'Before\n' +
        '    When noop\n' +
        '    Then noop\n' +
        'After\n' +
        'AfterAll\n'
    )
  })
})
