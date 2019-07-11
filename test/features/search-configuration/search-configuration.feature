Feature: Search Configuration
  @regression
  Scenario: TC324557: Rebuild index warning should appear when excluding family 
    Given the user has logged in with the "admin" account
    And the user changes the screen size to iPad
    And the user has navigated to Search Configuration
    And the user excludes family "AAAA" from the search results
    When the user saves the search configuration
    Then the rebuild index warning is displayed


  @regression
  @cleanup
  Scenario: Rebuild index warning should appear when including a family
    Given the user has logged in with the "admin" account
    And the user changes the screen size to iPad
    And the user has navigated to Search Configuration
    And the user includes family "AAAA" in the search results
    When the user saves the search configuration
    Then the rebuild index warning is displayed
