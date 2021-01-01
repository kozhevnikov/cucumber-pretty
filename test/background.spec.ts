import 'should'

import { run } from './exec'

describe('Background', () => {
  it('does not log backgrounds', () => {
    run('background.feature').should.startWith(
      'Feature: Background\n' +
        '\n' +
        '  Scenario: Background scenario\n' +
        '    Given noop\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline\n' +
        '    Given noop\n' +
        '    When noop "bar"\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Background scenario outline\n' +
        '    Given noop\n' +
        '    When noop "baz"\n' +
        '    Then noop'
    )
  })
})
