import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, selectDropdownOption, waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class QueryConditionsGrid {
    private locators = {
        conditionsGrid: by.xpath("//*[@class='query-conditions-container']//*[@class='qc-grid-container']"),
        emptyField: by.xpath("//*[@data-testid='empty-field']//select"),
        field: (field: string) => by.xpath(`//*[@data-testid='${field}']//select`),
        emptyCondition: (field: string) => by.xpath(`//*[@data-testid='${field}']//*[@data-testid='empty-criteria']`),
        addNewCondition: (field: string) =>
            by.xpath(
                `//*[@data-testid='${field}']//*[@data-testid='empty-criteria']/following-sibling::*[contains(@data-bind, 'launchCriteriaExpressionBuilder')]`
            ),
        includeCheckbox: (field: string) =>
            by.xpath(`//*[@data-testid='${field}']//mi-checkbox[contains(@data-bind, 'checked: include')]`),
        totalTypeDropdown: (field: string) =>
            by.xpath(`//*[@data-testid='${field}']select[contains(@data-bind, 'options: aggregateTypes')]`),
        totalTypeValue: (field: string, totalType: string) =>
            by.xpath(
                `//*[@data-testid='${field}']//select[contains(@data-bind, 'options: aggregateTypes')]//option[@value='${totalType}']`
            ),
        expressionBuilder: {
            advancedTab: by.xpath(
                "//*[@class='expression-builder']//*[contains(@class, 'nav-pills')]//button[text()='Advanced']"
            ),
            advancedCodeEditor: by.xpath(
                "//*[@class='expression-builder']//*[contains(@class, 'expression-builder-advanced')]//textarea[contains(@class, 'expression-box')]"
            ),
            done: by.xpath("//*[@class='expression-builder']//*[@class='controls']//button[text()='Done']")
        },
        limitCheckbox: by.xpath("//*[text()[contains(.,'Limit Results')] and contains(@class,'chkbox-text')]"),
        limitValue: by.xpath(
            "//*[contains(@class,'limit-results-input-container pull-left')]//input[@class='form-control']"
        )
    };

    async waitUntilReady(): Promise<void> {
        Logger.info('Wait until Query Conditions Grid is ready');
        return waitUntilVisible(this.locators.conditionsGrid);
    }

    async isReady(): Promise<boolean> {
        Logger.debug('Asking if Query Conditions Grid is displayed');
        return element(this.locators.conditionsGrid).isDisplayed();
    }

    async addField(field: string): Promise<void> {
        Logger.info(`Adding field '${field}' to the conditions grid`);
        await waitUntilVisible(this.locators.emptyField);
        return selectDropdownOption.byText(field, this.locators.emptyField);
    }

    async setLimit(limitValue: string): Promise<void> {
        Logger.debug(`Setting Limit to ${limitValue}`);
        await waitForThenClick(this.locators.limitCheckbox);
        return element(this.locators.limitValue)
            .clear()
            .sendKeys(limitValue);
    }

    async addAdvancedConditionToField(expression: string, field: string): Promise<void> {
        Logger.info(`Adding advanced condition expression to field '${field}' in the conditions grid`);

        // Open advanced expression builder
        await waitForThenClick(this.locators.addNewCondition(field));
        await waitForThenClick(this.locators.expressionBuilder.advancedTab);

        // Add expression
        const codeEditor = element(this.locators.expressionBuilder.advancedCodeEditor);
        await waitForThenClick(codeEditor);
        await codeEditor.sendKeys(expression);

        return waitForThenClick(this.locators.expressionBuilder.done);
    }

    async setTotalTypeForField(totalType: string, field: string): Promise<void> {
        Logger.info(`Setting total type to '${totalType}' for field '${field}' in the conditions grid`);

        return waitForThenClick(this.locators.totalTypeValue(field, totalType));
    }

    async invertIncludeForField(field: string): Promise<void> {
        Logger.info(`Clicking the include checkbox for field '${field}' in the conditions grid`);

        return waitForThenClick(this.locators.includeCheckbox(field));
    }
}
