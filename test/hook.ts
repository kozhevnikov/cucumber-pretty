import 'should'

import { run } from './exec'

describe('Hook', () => {
  it('should not log hook', () => {
    run('hook.feature').should.startWith(
      '[[[BeforeAll]]]\n' +
        'Feature: Hook\n' +
        '\n' +
        '  @before @after\n' +
        '  Scenario: Hook\n' +
        '[[[Before]]]\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '[[[After]]]\n' +
        '\n' +
        '[[[AfterAll]]]\n'
    )
  })
})
