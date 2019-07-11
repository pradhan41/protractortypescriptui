Feature: Query Designer

  @regression
  Scenario: TC225343 - User with site-specific access can create and execute a query
    Given the user has logged in with the "hositeuser" account
    When the user opens a new query in the designer
    And the user adds the family "Equipment" to the current query
    And the user adds the fields "Equipment.Equipment ID, Equipment.MI_SITE_KEY" to the current query
    And the user adds the advanced criteria "=64252007587" to the field "Equipment.MI_SITE_KEY" of the current query
    And the user runs the query
    Then the query results are displayed
  
  @regression
  Scenario: TC268167 - When a secured user creates a new query, the correct families are available as sources
    Given the user has logged in with the "coremechint" account
    When the user opens a new query in the designer
    Then the available sources include the "Thickness Measurement" family
    And the available sources do not include the "Safety Device Tag, Inactive Family" families

  @regression
  Scenario: TC268268 - When a secured user creates a new query, the correct related families are available as sources
    Given the user has logged in with the "coremechint" account
    When the user opens a new query in the designer
    And the user adds the family "Equipment" to the current query
    And the user adds a related source to the "Equipment" source of the current query
    Then the available related sources include the "Asset Group" family
    And the available related sources do not include the "GAA Wind Unit" family

  @regression
  Scenario: TC324079: Limit of zero not allowed
    Given the user has logged in with the "admin" account
    And the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" in query designer
    And the user sets the limit to "0"
    And the user runs the query
    Then the user sees query error popup

  @regression
  Scenario: Limit of negative number not allowed 
    Given the user has logged in with the "admin" account
    And the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" in query designer
    And the user sets the limit to "-1"
    And the user runs the query
    Then the user sees query error popup

  @regression
  Scenario: TC324211: Recent Delete Query should be opened in designer 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Delete Query - Motors" in query designer
    And the user closes the "Delete Query - Motors" tab
    When the user views recent query "Delete Query - Motors"
    Then the query designer should be displayed
 
  @regression
  Scenario: TC324211: Recent Update Query should be opened in designer 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Invalid Query - Motors" in query designer
    And the user closes the "Invalid Query - Motors" tab
    When the user views recent query "Invalid Query - Motors"
    Then the query designer should be displayed

  @regression
  Scenario: TC324211: Recent Append Query should be opened in designer 
    Given the user has logged in with the "admin" account
    And the user opens the action query "Public\\Meridium\\Queries\\Append Query - Motors" in query designer
    And the user closes the "Append Query - Motors" tab
    When the user views recent query "Append Query - Motors"
    Then the query designer should be displayed
