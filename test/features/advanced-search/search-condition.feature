Feature: Advanced Search Conditions
  @smoke
  @regression
  Scenario: TC225349: Numeric Field Equals in Metric
    Given the user has logged in with the "metric" account
    And the user creates a new advanced search for family "Thickness Measurement"
    And the user adds a condition for family "Thickness Measurement" field "Measurement Value" condition "equals" value "7.62"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Measurement Value"
    And the query results contain the value "7.62(Millimeters)" in the column "Measurement Value"
    And the query results do not contain the value "0.3(Inches)" in the column "Measurement Value" in the first "2" pages
    And the query results contain the value ".3-01/01/1990" in the column "Record ID"
  
  @regression
  Scenario: TC225349: Relationship Numeric Field Equals in Metric
    Given the user has logged in with the "metric" account
    And the user creates a new advanced search for family "Thickness Measurement" linked to "Thickness Measurement Location" through "Has Measurements"
    And the user adds a condition for family "Thickness Measurement Location" field "Nominal Thickness" condition "equals" value "7.874"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Related Record ID, Nominal Thickness"
    And the query results contain the value "7.874(Millimeters)" in the column "Nominal Thickness"
    And the query results do not contain the value "0.31(Inches)" in the column "Nominal Thickness" in the first "2" pages
    And the query results contain the value "0.31-1/1/1999" in the column "Record ID"
    And the query results contain the value "UTTML-4 UT Active" in the column "Related Record ID"
  
  @regression
  Scenario: TC225349: UOM conversion step 1 - save as metric
    Given the user has logged in with the "metric" account
    And the user creates a new advanced search for family "Thickness Measurement" 
    And the user adds a condition for family "Thickness Measurement" field "Measurement Value" condition "equals" value "7.62"
    And the user runs the advanced search
    And the advanced search results are displayed
    And the user adds linked family "Thickness Measurement Location" through "Has Measurements"
    And the user adds a condition for family "Thickness Measurement Location" field "Nominal Thickness" condition "equals" value "7.874"
    And the user runs the advanced search
    And the advanced search results are displayed
    And the query results contain the value "7.874(Millimeters)" in the column "Nominal Thickness"
    And the query results do not contain the value "0.31(Inches)" in the column "Nominal Thickness"
    And the query results contain the value "7.62(Millimeters)" in the column "Measurement Value"
    And the query results do not contain the value "0.3(Inches)" in the column "Measurement Value" in the first "2" pages
    When the user saves the search in "Personal\\MIMetric, Core\\Searches" as "AUTOMATED TEST - UOM CONVERSION"
    Then the search should be saved successfully
  
  @regression
  Scenario: TC225349: UOM conversion step 2 - open in US
    Given the user has logged in with the "admin" account
    And the user opens the search "Personal\\MIMetric, Core\\Searches\\AUTOMATED TEST - UOM CONVERSION" from the catalog
    When the user runs the advanced search  
    Then the advanced search results are displayed
    And the query results do not contain the value "7.874(Millimeters)" in the column "Nominal Thickness"
    And the query results contain the value "0.31(Inches)" in the column "Nominal Thickness"
    And the query results do not contain the value "7.62(Millimeters)" in the column "Measurement Value" in the first "2" pages
    And the query results contain the value "0.3(Inches)" in the column "Measurement Value"
  
  @regression
  @cleanup
  Scenario: TC225349: Remove saved UOM search
    Given the user has logged in with the "admin" account
    When the user deletes "Personal\\MIMetric, Core\\Searches\\AUTOMATED TEST - UOM CONVERSION" from the catalog
    Then the catalog item should be deleted successfully

  @regression
  Scenario: TC286956: Numeric Field Equals
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "Thickness Measurement"
    And the user adds a condition for family "Thickness Measurement" field "Measurement Value" condition "equals" value ".3"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Measurement Value"
    And the query results contain the value "0.3(Inches)" in the column "Measurement Value"
    And the query results do not contain the value "0.25" in the column "Measurement Value" in the first "2" pages
    And the query results contain the value ".3-01/01/1990" in the column "Record ID"
  
  @regression
  Scenario: TC286965: Numeric Field Is At Most
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "Thickness Measurement"
    And the user adds a condition for family "Thickness Measurement" field "Measurement Value" condition "is at most" value ".15"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Measurement Value"
    And the query results contain the value "0.15(Inches)" in the column "Measurement Value"
    And the query results do not contain the value "0.25(Inches)" in the column "Measurement Value" in the first "2" pages
    And the query results contain the value ".15-08/31/2000" in the column "Record ID"
  
  @regression
  Scenario: TC286968: Numeric Field Is At Least
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "Thickness Measurement"
    And the user adds a condition for family "Thickness Measurement" field "Measurement Value" condition "is at least" value ".21"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Measurement Value"
    And the query results contain the value "0.22(Inches)" in the column "Measurement Value"
    And the query results do not contain the value "0.15" in the column "Measurement Value" in the first "2" pages
    And the query results contain the value ".25-01/01/1995" in the column "Record ID"

  @regression
  Scenario: TC225351: Logical Field Is True
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "RBI Criticality Analysis"
    And the user adds a condition for family "RBI Criticality Analysis" field "Allowable Stress Override" condition "is true"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Allowable Stress Override"
    And the query results contain the value "true" in the column "Allowable Stress Override"
    And the query results do not contain the value "false" in the column "Allowable Stress Override" in the first "2" pages
    And the query results contain the value "F0065-097-ET-2 ~ Heat Exchanger Tubes ~ 4/25/2018 ~" in the column "Record ID"
  
  @regression
  Scenario: TC286898: Logical Field Is False
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "RBI Criticality Analysis"
    And the user adds a condition for family "RBI Criticality Analysis" field "Allowable Stress Override" condition "is false"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Allowable Stress Override"
    And the query results do not contain the value "true" in the column "Allowable Stress Override" in the first "2" pages
    And the query results contain the value "false" in the column "Allowable Stress Override" 
    And the query results contain the value "RBI-00001741" in the column "Record ID"

  @regression
  Scenario: TC286931: Logical Field Is Null
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "RBI Criticality Analysis"
    And the user adds a condition for family "RBI Criticality Analysis" field "Allowable Stress Override" condition "is null"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Allowable Stress Override"
    And the query results do not contain the value "true" in the column "Allowable Stress Override" in the first "2" pages
    And the query results contain the value "false" in the column "Allowable Stress Override"
    And the query results contain the value "RBI-64253071348" in the column "Record ID"

  @regression
  Scenario: TC286933: Logical Field Is Not Null
    Given the user has logged in with the "admin" account
    And the user creates a new advanced search for family "RBI Criticality Analysis"
    And the user adds a condition for family "RBI Criticality Analysis" field "Allowable Stress Override" condition "is not null"
    When the user runs the advanced search
    Then the advanced search results are displayed
    And the query results contain the columns "Record ID, Allowable Stress Override"
    And the query results contain the value "true" in the column "Allowable Stress Override"
    And the query results contain the value "false" in the column "Allowable Stress Override"
    And the query results contain the value "F0065-097-ET-1 ~ Heat Exchanger Tubes ~ 4/25/2018 ~" in the column "Record ID"
    And the query results contain the value "F0065-097-ET-2 ~ Heat Exchanger Tubes ~ 4/25/2018 ~" in the column "Record ID"
