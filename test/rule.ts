import 'should'

import { run } from './exec'

describe('@wip Rule', () => {
  it('should log rules', () => {
    const expectedOutput =
      'Feature: Rule\n\
\n\
  Scenario: No rule top scenario\n\
    Given noop\n\
\n\
  Rule: first rule\n\
\n\
    Scenario: Rule 1 scenario\n\
      Given noop\n\
\n\
  Rule: second rule\n\
\n\
    Scenario: Rule 2 scenario\n\
      Given noop\n'
    run('rule.feature').should.startWith(expectedOutput)
  })

  it('should log backgrounds in rules')
})
