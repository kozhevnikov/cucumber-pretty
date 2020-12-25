import 'should'

import { args, exec } from './exec'

describe('Feature', () => {
  it('should log feature name', () => {
    exec(
      'test/features/feature.feature',
      '--name',
      'Feature',
      ...args
    ).should.startWith('Feature: Feature\n')
  })

  it('should log new lines', () => {
    exec('test/features/', '--name', 'Feature \\d', ...args).should.startWith(
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
