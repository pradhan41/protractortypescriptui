Feature: Query Designer - SQL Tab

  @smoke
  @regression
  Scenario: User can create a query in the SQL Designer and see results
    Given the user has logged in with the "admin" account
    When the user creates a query from SQL "SELECT [MI_ACTION].[MI_ACTION_ID_C] "Action ID" FROM [MI_ACTION]"
    And the user runs the query
    Then the query results are displayed

  @smoke
  @regression
  Scenario: User can create a query in the SQL Designer and see HX-2287_Act203 in the results
    Given the user has logged in with the "admin" account
    When the user creates a query from SQL "SELECT [MI_ACTION].[MI_ACTION_ID_C] "Action ID" FROM [MI_ACTION]"
    And the user runs the query
    Then the query results do not contain the value "HX-2287_Act203"

  @smoke
  @regression
  Scenario: User can create a query in the SQL Designer and see HX-2287_Act112 in the results
    Given the user has logged in with the "admin" account
    When the user creates a query from SQL "SELECT [MI_ACTION].[MI_ACTION_ID_C] "Action ID" FROM [MI_ACTION]"
    And the user runs the query
    Then the query results contain the value "HX-2287_Act112"

  @regression
  Scenario: TC328302 - User can create a query in the SQL Designer with DISTINCT and UNION
     Given the user has logged in with the "admin" account
     When the user creates a query from the predefined SQL "selectDistinctUnion"
     And the user runs the query
     Then the query results contain the columns "SrcEntyKey, SrcId, SrcFamilyCapt, Included"
     And the query results contain the value "64254041828" in the column "SrcEntyKey"

  @regression
  Scenario: TC328299 - User can create a query with TotalType Where
     Given the user has logged in with the "admin" account
     When the user creates a query from the predefined SQL "selectTotalTypeWhere"
     And the user selects the query design tab
     And the user sets total type to "Where" for the field "Work History.Maintenance Start Date" of the current query
     And the user clicks the include checkbox to the field "Work History.Maintenance Start Date" of the current query
     And the user runs the query
     Then the query results contain the columns "Equipment Technical Number"
     And the query results contain the value "H-401" in the column "Equipment Technical Number"

  @regression
  Scenario: TC328168: User can add OR condition
    Given the user has logged in with the "admin" account
    When the user creates a query from the predefined SQL "selectWithLikeCriteria"
    And the user selects the query design tab
    And the user adds the advanced criteria "Like '%b%'" to the field "Action.Name" of the current query
    And the user runs the query
    Then the query results are displayed
