import 'should'

import { run } from './exec'

describe('Scenario', () => {
  it('logs scenario names', () => {
    run('scenario.feature', { '--name': 'Scenario name' }).should.containEql(
      '  Scenario: Scenario name\n'
    )
  })

  it('logs new lines between scenarios', () => {
    run('scenario.feature', { '--name': 'Scenario \\d' }).should.containEql(
      'Feature: Scenario\n' +
        '\n' +
        '  Scenario: Scenario 1\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario: Scenario 2\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})
