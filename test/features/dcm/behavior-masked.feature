Feature: Masked Behavior
    @smoke
    @regression
    Scenario: Add masked behavior
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Masked Field: " to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user saves the behavior
        Then the behavior will be saved successfully
    @smoke
    @regression
    @cleanup
    Scenario: Remove masked behavior
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        When the user removes a behavior "Masked Field: *" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field in family "AQA CORE ALL Fld Types Parent Family"
        Then the behavior will be saved successfully

