Feature: Disabled Behavior
    @smoke
    @regression
    Scenario: TC325208: Add disabled behavior always true
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Disabled" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user selects "Assign True" for the Operator
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: TC325375: Add disabled behavior Security Group
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Disabled" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user configures "Security Group" and "MIAdmin" for the "If" behavior
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: TC325392: Add disabled behavior If Else
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Disabled" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user configures "Security Group" and "MIAdmin" for the "If" behavior
        And the user adds a new "Else" behavior
        And the user configures "Security Group" and "Super Users" for the "Else" behavior
        And the user saves the behavior
        Then the behavior will be saved successfully