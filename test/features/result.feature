Feature: Result Feature

  Scenario: Result Error Scenario
    When step passed
    Then error

  Scenario: Result Pending Scenario
    When step passed
    Then pending

  Scenario: Result Undefined Scenario
    When step passed
    Then undefined

  Scenario: Result Undefined Scenario
    When step passed
    Then ambiguous
