import 'should'

import { run } from './exec'

describe('Scenario', () => {
  it('logs scenario names', () => {
    run('scenario.feature', { '--name': 'Scenario name' }).should.containEql(
      '  Scenario: Scenario name # test/features/scenario.feature:3\n'
    )
  })

  it('logs new lines between scenarios', () => {
    run('scenario.feature', { '--name': 'Scenario \\d' }).should.containEql(
      'Feature: Scenario # test/features/scenario.feature:1\n' +
        '\n' +
        '  Scenario: Scenario 1 # test/features/scenario.feature:7\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario: Scenario 2 # test/features/scenario.feature:11\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})
