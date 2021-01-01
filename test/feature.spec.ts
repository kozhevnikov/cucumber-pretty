import 'should'

import { run } from './exec'

describe('Feature', () => {
  it('logs feature names', () => {
    run('feature.feature', { '--name': 'Feature' }).should.startWith(
      'Feature: Feature\n'
    )
  })

  it('logs new lines between scenarios and features', () => {
    run('*.feature', { '--name': 'Feature \\d' }).should.startWith(
      'Feature: Feature\n' +
        '\n' +
        '  Scenario: Feature 1\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        'Feature: Feature\n' +
        '\n' +
        '  Scenario: Feature 2\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario: Feature 3\n' +
        '    When noop\n' +
        '    Then noop\n'
    )
  })
})
