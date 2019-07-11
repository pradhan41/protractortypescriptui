Feature: Catalog Query Execute

  @regression
  Scenario: TC225333 - User can execute a query with nested query sources
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Nest3" from the catalog
    Then the query results are displayed
    And the query results contain the columns "Work History Detail ID, Event Start Date"

  Scenario: User can execute a catalog query and see results
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" from the catalog
    Then the query results are displayed

  Scenario: User can execute the Query with Hyperlinks query and find the value 6425152959 in the results
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" from the catalog
    Then the query results are displayed
    And the query results contain the value "64251520959"

  Scenario: User can execute the Query with Hyperlinks query and find the resulting column Datapoint ID
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" from the catalog
    Then the query results are displayed
    And the query results contain the column "Datapoint ID"

  Scenario: User can execute the Nest1 query and find the value WHD-000240000026-000280000026-0001 in the results
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Nest1" from the catalog
    Then the query results are displayed
    And the query results contain the value "WHD-000240000026-000280000026-0001"

  Scenario: User can execute the Query with Hyperlinks query and find the value 2809041 in the ENTY_KEY column of the results
    Given the user has logged in with the "admin" account
    When the user opens the query "Public\\Meridium\\Queries\\Query with Hyperlinks" from the catalog
    Then the query results are displayed
    And the query results contain the value "2809041" in the column "ENTY_KEY"

  Scenario: User can execute the Nest1 query and find the value WHD-000240000005-000280000005-0001 in the results
  Given the user has logged in with the "admin" account
  When the user opens the query "Public\\Meridium\\Queries\\Nest1" from the catalog
  Then the query results are displayed
  And the query results contain the value "WHD-000240000005-000280000005-0001"
