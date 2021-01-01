Feature: Step

  Description

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
