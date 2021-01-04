@tag
Feature: Step

  Description

  @stag
  Scenario: Step name
    Given noop
    When noop
    Then noop
    And noop
    But noop

  Scenario: Ambiguous step
    When ambiguous

  Scenario: Failed step
    When failed

  Scenario: Passed step
    When passed

  Scenario: Pending step
    When pending

  Scenario: Skipped step
    When skipped

  Scenario: Undefined step
    When undefined

  Scenario: DocString
    Given doc string:
      """
      Some multiline
      Text
      """

  Scenario: DataTable
    Given data table:
      | a | b |
      | c | d |

  Rule: some rule

    Scenario: scenario under rule
      Given noop