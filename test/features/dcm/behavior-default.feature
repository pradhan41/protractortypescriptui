Feature: Default Behavior
    @smoke
    @regression
    Scenario: TC325131: Add default behavior Left Constant character field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Default" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user enters "Iron Man" in the left constant field
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: TC325187: Add default behavior Left Field character field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Default" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user enters "Text Field" for the left field
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: TC325191: Add default behavior Left Constant date field
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Default" to the "AQA_CORE_ALL_FLD_TY_DATE_F_DT" field
        And the user enters "5/30/2019" in the left constant date field
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: TC325206: Add default behavior DateTime.Now()
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Default" to the "AQA_CORE_ALL_FLD_TY_DATE_F_DT" field
        And the user selects default current date checkbox
        And the user saves the behavior
        Then the behavior will be saved successfully

