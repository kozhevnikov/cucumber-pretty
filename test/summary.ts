import 'should'

import { run } from './exec'

describe('Summary', () => {
  it('should log empty summary', () => {
    run('feature.feature', { '--tags': ['@empty'] }).should.equal(
      '0 scenarios\n' + '0 steps\n' + '0m00.000s (executing steps: 0m00.000s)\n'
    )
  })

  it('should log new line', () => {
    run('feature.feature', { '--name': 'Feature name' }).should.equal(
      'Feature: Feature\n' +
        '\n' +
        '  Scenario: Feature name\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '1 scenario (1 passed)\n' +
        '2 steps (2 passed)\n' +
        '0m00.000s (executing steps: 0m00.000s)\n'
    )
  })
})
