@complex-feature
Feature: Complex Feature

  Complex Feature Description

  Background: Complex Background

  Complex Background Description

    Given foo

  Scenario: Simple Scenario
    When bar
    Then baz

  @complex-scenario
  Scenario Outline: Complex Scenario Outline

  Complex Scenario Outline Description

    #Complex Comment
    Given foo "<foo>"
    When bar
      | key | value |
      | Bar | Table |
      | Baz | Table |
    Then baz
      """
      Foo Doc String
      Bar Doc String
      Baz Doc String
      """

    @complex-examples
    Examples:
      | foo |
      | bar |
      | baz |
