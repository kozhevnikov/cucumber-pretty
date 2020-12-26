import 'should'

import { run } from './exec'

describe('Description', () => {
  it('should log feature description', () => {
    run('description.feature').should.startWith(
      'Feature: Description\n' +
        '\n' +
        '  **I like**\n' +
        '  To describe\n' +
        '  My _features_\n' +
        '\n'
    )
  })

  it('should not log scenario description', () => {
    run('description.feature').should.containEql(
      '  Scenario: Description scenario\n' +
        '    When noop\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Description scenario outline\n' +
        '    When noop "bar"\n' +
        '    Then noop\n' +
        '\n' +
        '  Scenario Outline: Description scenario outline\n' +
        '    When noop "baz"\n' +
        '    Then noop'
    )
  })
})
