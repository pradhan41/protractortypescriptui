Feature: Site Reference

  @regression
  Scenario: TC320876: User should not be able to create a new Site Reference using Record Manager 
    Given the user has logged in with the "admin" account
    And the user begins creating a new record
    When the user specifies the new record family of "Site Reference"
    Then the new record family search results do not contain the value "Site Reference"

  @regression
  Scenario: TC320880: User should navigate to Site module from global search result
    Given the user has logged in with the "admin" account
    And the user searches for and opens the test record "Site Reference"
    Then the Site Reference module is opened