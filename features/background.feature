Feature: Background

  Background: Background name
    Given noop

  Scenario: Background scenario
    When noop
    Then noop

  Scenario Outline: Background scenario outline
    When noop "<foo>"
    Then noop

    Examples: Background examples
      | foo |
      | bar |
      | baz |
