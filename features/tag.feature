@feature @tag
Feature: Tag

  Scenario: Feature tag
    When noop
    Then noop

  @scenario
  Scenario: Scenario tag
    When noop
    Then noop

  @scenario-outline
  Scenario Outline: Scenario outline tag
    When noop "<foo>"

  @example
    Examples:
      | foo |
      | bar |
      | baz |
