import 'should'

import { run } from './exec'

describe('Rule', () => {
  it('logs rules', () => {
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

  it('logs background steps in rules', () => {
    const expectedOutput =
      'Feature: Rule background\n\
\n\
  Rule: the rule\n\
\n\
    Scenario: Rule 1 scenario\n\
      Given noop\n\
      Given noop\n'
    run('rule-background.feature').should.startWith(expectedOutput)
  })

  it('offsets the scenario indentation', () => {
    run('rule*.feature').should.startWith(
      'Feature: Rule background\n\
\n\
  Rule: the rule\n\
\n\
    Scenario: Rule 1 scenario\n\
      Given noop\n\
      Given noop\n\
\n\
Feature: Rule'
    )
  })
})
