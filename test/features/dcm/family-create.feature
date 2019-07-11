Feature: Create Family

  @regression
  Scenario: TC321955: SQL Keywords are not allowed as the Entity Physical Table Name
    Given the user has logged in with the "admin" account
    And the user has navigated to Family Management
    And the user creates a new entity family with caption "ADD" and description "ADD"
    And the user sees error dialog
    When the user reloads the page
    Then no search results should be displayed for entity family "ADD"

  @regression
  Scenario: TC321955: SQL Keywords are not allowed as the Relationship Physical Table Name
    Given the user has logged in with the "admin" account
    And the user has navigated to Family Management
    And the user creates a new relationship family with caption "ADD" and description "ADD"
    And the user sees error dialog
    When the user reloads the page
    Then no search results should be displayed for relationship family "ADD"



