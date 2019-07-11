# Actions such as Create Graph, etc
Feature: Query Actions
  @regression
  Scenario: TC324075: Delete Query cannot be graphed 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Delete Query - Motors" in query designer
    When the user creates a graph
    Then the user sees query error popup

  @regression
  Scenario: TC324075: Update Query cannot be graphed 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Invalid Query - Motors" in query designer
    When the user creates a graph
    Then the user sees query error popup

  @regression
  Scenario: TC324075: Append Query cannot be graphed 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Append Query - Motors" in query designer
    When the user creates a graph
    Then the user sees query error popup