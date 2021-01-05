import 'should'

import { run } from './exec'

describe('Hook', () => {
  it('does not log hooks', () => {
    run('hook.feature').should.startWith(
      '[[[BeforeAll]]]\n' +
        'Feature: Hook # test/features/hook.feature:1\n' +
        '\n' +
        '  @before @after\n' +
        '  Scenario: Hook # test/features/hook.feature:4\n' +
        '[[[Before]]]\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '[[[After]]]\n' +
        '\n' +
        '[[[AfterAll]]]\n'
    )
  })
})
