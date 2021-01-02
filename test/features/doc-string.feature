Feature: Doc String

  Scenario: Doc String
    When doc string:
      """
      foo
      bar
      """
    Then noop

  Scenario: Doc String with indentation
    When doc string:
      """
      foo
        bar
          baz
      /foo
      """