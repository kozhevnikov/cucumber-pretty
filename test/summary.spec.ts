import 'should'

import { run } from './exec'

describe('Summary', () => {
  it('logs empty run summaries', () => {
    run('feature.feature', { '--tags': ['@empty'] }).should.equal(
      '0 scenarios\n' + '0 steps\n' + '0m00.000s (executing steps: 0m00.000s)\n'
    )
  })

  it('logs summaries after a new line', () => {
    run('feature.feature', { '--name': 'Feature name' }).should.equal(
      'Feature: The Feature # test/features/feature.feature:1\n' +
        '\n' +
        '  Scenario: Feature name # test/features/feature.feature:3\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '1 scenario (1 passed)\n' +
        '2 steps (2 passed)\n' +
        '0m00.000s (executing steps: 0m00.000s)\n'
    )
  })
})
