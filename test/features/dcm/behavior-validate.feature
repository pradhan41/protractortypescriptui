Feature: Validate Behavior
    @smoke
    @regression
    Scenario: Add validate behavior equal to date
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Validate" to the "AQA_CORE_ALL_FLD_TY_DATE_F_DT" field
        And the user selects "Equal" for the Operator
        And the user selects "Date Field" for the Left Field
        And the user selects todays date for the right constant
        And the user saves the behavior
        Then the behavior will be saved successfully
   