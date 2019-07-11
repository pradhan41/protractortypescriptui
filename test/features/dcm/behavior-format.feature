Feature: Format Behavior
    @smoke
    @regression
    Scenario: TC325396: Add format behavior date field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Format" to the "AQA_CORE_ALL_FLD_TY_DATE_F_DT" field
        And the user selects "Short Date" from the format value drop down
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: Add custom format behavior date field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Format" to the "AQA_CORE_ALL_FLD_TY_DATE_F_DT" field
        And the user selects "Custom" from the format value drop down
        And the user enters "MM\dd\yyyy" as the custom format
        And the user saves the behavior
        Then the behavior will be saved successfully
    @smoke
    @regression
    Scenario: Add format behavior numeric field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Format" to the "AQA_CORE_ALL_FLD_TY_NUMER_NBR" field
        And the user selects "Currency" from the format value drop down
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: Add custom format behavior numeric field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Format" to the "AQA_CORE_ALL_FLD_TY_NUMER_NBR" field
        And the user selects "Custom" from the format value drop down
        And the user enters "D" as the custom format
        And the user saves the behavior
        Then the behavior will be saved successfully