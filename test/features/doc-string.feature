Feature: Doc String

  Scenario: Doc String
    When doc string:
      """
      foo
      bar
      """
    Then noop
