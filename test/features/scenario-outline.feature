Feature: Scenario Outline

  Scenario Outline: Scenario outline
    When noop "<foo>"

    Examples:
      | foo |
      | bar |
      | baz |
