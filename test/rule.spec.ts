import 'should'

import { run } from './exec'

describe('Rule', () => {
  it('logs rules', () => {
    const expectedOutput =
      'Feature: Rule # test/features/rule.feature:1\n\
\n\
  Scenario: No rule top scenario # test/features/rule.feature:3\n\
    Given noop\n\
\n\
  Rule: first rule\n\
\n\
    Scenario: Rule 1 scenario # test/features/rule.feature:8\n\
      Given noop\n\
\n\
  Rule: second rule\n\
\n\
    Scenario: Rule 2 scenario # test/features/rule.feature:13\n\
      Given noop\n'
    run('rule.feature').should.startWith(expectedOutput)
  })

  it('logs background steps in rules', () => {
    const expectedOutput =
      'Feature: Rule background # test/features/rule-background.feature:1\n\
\n\
  Rule: the rule\n\
\n\
    Scenario: Rule 1 scenario # test/features/rule-background.feature:8\n\
      Given noop\n\
      Given noop\n'
    run('rule-background.feature').should.startWith(expectedOutput)
  })

  it('offsets the scenario indentation', () => {
    run('rule*.feature').should.startWith(
      'Feature: Rule background # test/features/rule-background.feature:1\n\
\n\
  Rule: the rule\n\
\n\
    Scenario: Rule 1 scenario # test/features/rule-background.feature:8\n\
      Given noop\n\
      Given noop\n\
\n\
Feature: Rule'
    )
  })
})
