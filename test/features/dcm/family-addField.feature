Feature: Add Family field
    @smoke
    @regression
    Scenario: Add character field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new field "My field" with a description of "my desc"
        And the user saves the behavior
        Then the behavior will be saved successfully