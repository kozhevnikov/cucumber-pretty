import 'should'

import { run } from './exec'

describe('Feature', () => {
  it('logs feature names and inserts new lines between scenarios and features', () => {
    run('*.feature', { '--name': 'Feature \\d' }).should.startWith(
      'Feature: The Feature # test/features/feature.feature:1\n' +
        '\n' +
        '  Scenario: Feature 1 # test/features/feature.feature:7\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        'Feature: Feature # test/features/feature2.feature:1\n' +
        '\n' +
        '  Scenario: Feature 2 # test/features/feature2.feature:3\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario: Feature 3 # test/features/feature2.feature:7\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})
