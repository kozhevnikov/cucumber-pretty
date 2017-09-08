@complex-feature-tag
Feature: Complex Feature

  Complex Feature Description

  Background: Complex Background

  Complex Background Description

    Given step given

  Scenario: First Complex Scenario
    When step when
    Then step then

  @complex-scenario-tag
  Scenario Outline: Second Complex Scenario Outline

  Complex Scenario Outline Description

    #Complex Comment
    Given example "<foo>"
    When table
      | key   | value   |
      | Key 1 | Value 1 |
      | Key 2 | Value 2 |
    Then docstring
      """
      Foo Doc String
      Bar Doc String
      """

  @complex-examples-tag
    Examples:
      | foo |
      | bar |
      | baz |
