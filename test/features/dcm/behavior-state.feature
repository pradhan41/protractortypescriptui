Feature: State Behavior
    @smoke
    @regression
    Scenario: Add state behavior
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "State Management" to the "MI_SM_STATE_ID_C" field
        And the user saves the behavior
        Then the behavior will be saved successfully
    @smoke
    @regression
    @cleanup
    Scenario: Remove state behavior
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        When the user removes a behavior "State Management*" to the "MI_SM_STATE_ID_C" field in family "AQA CORE ALL Fld Types Parent Family"
        Then the behavior will be saved successfully
