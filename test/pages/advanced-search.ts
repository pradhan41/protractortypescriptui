import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { ResultGrid } from '@pages/result-grid';
import { Common } from '@pages/common';
import { Catalog } from '@pages/catalog';

const common = new Common();
const resultGrid = new ResultGrid();
const catalog = new Catalog();

export class AdvancedSearch {
    private locators = {
        createNewButton: by.xpath("//a[contains(@class,'btn-primary') and text()='Create New']"),
        searchButton: by.xpath("//button[contains(@class,'btn-primary') and text()='Search']"),
        saveIcon: by.xpath("//button[contains(@class,'btn-icon') and @title='Save']//i[@class='icon-save']"),
        saveDialog: {
            saveButton: by.xpath("//button[contains(@class,'btn-text') and text()='Save']"),
            nameField: by.xpath("//input[@id='fileNameTB']"),
            successMessage: by.xpath("//div[contains(@class, 'title-container') and @title='Save Succeeded']")
        },
        addConditionButton: by.xpath("//button[contains(@class,'btn-primary') and text()='Add']"),
        advancedSearchHeader: by.xpath("//h1[text()='Advanced Search']"),
        searchFamilyDropdown: by.xpath(
            "//div[contains(@class,'select source')]//input[contains(@class,'mi-selected-value-text')]"
        ),
        linkedFamilyDropdown: by.xpath(
            "//div[contains(@class,'link source')]//input[contains(@class,'mi-selected-value-text')]"
        ),
        throughFamilyDropdown: by.xpath(
            "//div[contains(@class,'relationship source')]//input[contains(@class,'mi-selected-value-text')]"
        ),
        conditionsDropdown: by.xpath("//h1[text()='Conditions']"),
        familyConditionInput: by.xpath(
            "//div[contains(@class,'data-entry-controls block')]//div[label/text()='Family']//input[contains(@class,'mi-selected-value-text')]"
        ),
        fieldInput: by.xpath(
            "//div[contains(@class,'data-entry-controls block')]//div[label/text()='Field']//input[contains(@class,'mi-selected-value-text')]"
        ),
        conditionInput: by.xpath(
            "//div[contains(@class,'data-entry-controls block')]//div[label/text()='Condition']//input[contains(@class,'mi-selected-value-text')]"
        ),
        valueInput: by.xpath(
            "//div[contains(@class,'data-entry-controls block')]//div[label/text()='Value']//input[contains(@class,'form-control')]"
        ),
        selectableFamilyOption: (family: string) =>
            by.xpath(
                `//div[not(contains(@style,'visbility:hidden'))]/div[@class='region']/div[not(contains(@style,'display: none'))]//p[contains(@class, 'mi-select-option') and text()='${family}']`
            ),
        selectableConditionOption: (value: string) =>
            by.xpath(
                `//div[not(contains(@style,'visbility:hidden'))]/div[@class='region']/div[not(contains(@style,'display: none'))]//p[contains(@class,'mi-select-option') and .='${value}']`
            )
    };

    async createNewSearch(family: string): Promise<void> {
        Logger.info(`Creating new search for ${family}`);
        await waitForThenClick(this.locators.createNewButton);
        await waitForThenClick(this.locators.searchFamilyDropdown);
        await element(this.locators.searchFamilyDropdown).sendKeys(family);
        return waitForThenClick(this.locators.selectableFamilyOption(family));
    }

    async createLinkedSearch(family: string, link: string, through: string): Promise<void> {
        Logger.info(`Creating new search for ${family}, ${link}, ${through}`);
        await this.createNewSearch(family);
        return this.addLinkToExistingSearch(link, through);
    }

    async addLinkToExistingSearch(link: string, through: string): Promise<void> {
        Logger.info(`Adding link ${link} through ${through}`);
        await waitForThenClick(this.locators.linkedFamilyDropdown);
        await element(this.locators.linkedFamilyDropdown).sendKeys(link);
        await waitForThenClick(this.locators.selectableFamilyOption(link));
        await waitForThenClick(this.locators.throughFamilyDropdown);
        return waitForThenClick(this.locators.selectableFamilyOption(through));
    }

    async addCondition(family: string, field: string, condition: string, value: string): Promise<void> {
        Logger.info(`Adding condition ${family}, ${field}, ${condition}`);
        await waitForThenClick(this.locators.conditionsDropdown);

        const regex = new RegExp(' ', 'g');

        await this.addConditionFamily(family.replace(regex, '\u00a0'));
        await this.addConditionField(field.replace(regex, '\u00a0'));
        await this.addConditionOperator(condition);
        await this.addValueAndTabOver(value);

        await waitForThenClick(this.locators.addConditionButton);
        return waitForThenClick(this.locators.conditionsDropdown);
    }

    private async addConditionFamily(value: string): Promise<void> {
        await element(this.locators.familyConditionInput).sendKeys(value);
        return waitForThenClick(this.locators.selectableConditionOption(value));
    }

    private async addConditionField(value: string): Promise<void> {
        const regex = new RegExp(' ', 'g');
        await element(this.locators.fieldInput).sendKeys(value);
        return waitForThenClick(this.locators.selectableConditionOption(value));
    }

    private async addConditionOperator(value: string): Promise<void> {
        await waitForThenClick(this.locators.conditionInput);
        await waitForThenClick(this.locators.selectableConditionOption(value));
    }

    private async addValueAndTabOver(value: string): Promise<void> {
        if (value !== null) {
            return element(this.locators.valueInput)
                .sendKeys(value)
                .sendKeys(protractor.Key.TAB);
        }

        return element(this.locators.conditionInput).sendKeys(protractor.Key.TAB);
    }

    async execute(): Promise<void> {
        Logger.info('Running advanced search');
        return waitForThenClick(this.locators.searchButton);
    }

    async save(catalogItemPath: string, caption: string): Promise<void> {
        Logger.info(`Saving advanced search to ${catalogItemPath} as ${caption}`);
        await waitForThenClick(this.locators.saveIcon);
        await catalog.openFolder(catalogItemPath);

        await waitForThenClick(this.locators.saveDialog.nameField);
        await element(this.locators.saveDialog.nameField).sendKeys(caption);
        return waitForThenClick(this.locators.saveDialog.saveButton);
    }

    async waitUntilReady(): Promise<void> {
        return waitUntilVisible(this.locators.advancedSearchHeader);
    }

    async waitUntilFormIsReady(): Promise<void> {
        return waitUntilVisible(this.locators.searchFamilyDropdown);
    }

    async waitUntilResultsReady(): Promise<void> {
        Logger.info('Wait until Search Results are ready');
        return resultGrid.waitUntilFinishedLoading();
    }

    async closeTabWithoutSavingChanges(): Promise<void> {
        Logger.info('Closing new search');
        return common.closeTabWithoutSavingChanges('New Search');
    }

    async verifySuccessMessageIsDisplayed(): Promise<void> {
        Logger.info('Verifying success message is displayed');
        return waitUntilVisible(this.locators.saveDialog.successMessage);
    }
}
