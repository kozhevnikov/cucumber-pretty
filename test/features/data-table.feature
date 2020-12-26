Feature: Data Table

  Scenario: Data Table
    When data table:
      | foo   | bar   |
      | lorem | ipsum |
    Then noop
