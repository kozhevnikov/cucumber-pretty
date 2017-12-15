Feature: Data Table

  Scenario: Data TAble
    When data table
      | foo   | bar   |
      | lorem | ipsum |
    Then noop
