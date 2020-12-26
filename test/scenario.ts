import 'should'

import { run } from './exec'

describe('Scenario', () => {
  it('should log scenario name', () => {
    run('scenario.feature', { '--name': 'Scenario name' }).should.containEql(
      '  Scenario: Scenario name\n'
    )
  })

  it('should log new lines', () => {
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
