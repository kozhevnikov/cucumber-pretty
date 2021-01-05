import 'should'

import { run } from './exec'

describe('Background', () => {
  it('does not log backgrounds', () => {
    run('background.feature').should.startWith(
      'Feature: Background # test/features/background.feature:1\n' +
        '\n' +
        '  Scenario: Background scenario # test/features/background.feature:6\n' +
        '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline # test/features/background.feature:10\n' +
        '    Given noop\n' +
        '    When noop "bar"\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline # test/features/background.feature:10\n' +
        '    Given noop\n' +
        '    When noop "baz"\n' +
        '    Then noop'
    )
  })
})
