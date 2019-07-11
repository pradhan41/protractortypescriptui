Feature: Picklist Behavior
    @smoke
    @regression
    Scenario: Add picklist behavior constant list
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Picklist" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user selects "ConstantList" for the Operator
        And the user adds "Red" for the constant list
        And the user adds "Blue" for the constant list
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: Add picklist behavior system code list
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Picklist" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user selects "SystemCodeList" for the Operator
        And the user selects "AQA_HR_MANAGERS (System Codes for HR Managers)" for the system code list
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: Add picklist behavior system code Ref list
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Picklist" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user selects "SystemCodeListRef" for the Operator
        And the user selects "AQA_HR_MANAGERS (System Codes for HR Managers)" for the system code list
        And the user selects "AQA_JOB_OPENINGS" for the system code ref list and "Fry Cook (01)" for the code
        And the user saves the behavior
        Then the behavior will be saved successfully
    @regression
    Scenario: Add picklist behavior system code Ref field list
        Given the user has logged in with the "admin" account
        And the user has navigated to Family Management
        And the user selects the "AQA CORE ALL Fld Types Parent Family" family
        When the user adds a new behavior "Picklist" to the "AQA_CORE_ALL_PAR_CHAR_FIEL_CHR" field
        And the user selects "SystemCodeListRefField" for the Operator
        And the user selects "AQA_HR_MANAGERS (System Codes for HR Managers)" for the system code list
        And the user selects "AQA_JOB_OPENINGS" for the system code ref list and "Char for Picklist 2" for the field
        And the user saves the behavior
        Then the behavior will be saved successfully