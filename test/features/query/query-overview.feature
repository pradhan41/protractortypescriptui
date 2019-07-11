Feature: Query Overview Screen
  @smoke
  @regression
  Scenario: Page header is shown on the query overview screen
    Given the user has logged in with the "admin" account
    When the user opens the query overview screen
    Then the query overview header is shown
