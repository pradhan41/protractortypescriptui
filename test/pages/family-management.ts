import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { LeftNav } from '@pages/left-nav';
import { Common } from '@pages/common';

const common = new Common();
const leftNav = new LeftNav();

export class FamilyManagement {
    locators = {
        familyManagementHeader: by.xpath('*[@id="right-panel"]/mi-header/div/mi-title/div/h1'),
        addEntityIcon: by.xpath(
            '//button[@class="btn btn-default btn-icon default-buttons-left "]//i[@class="icon-plus"]'
        ),
        addRelationshipIcon: by.xpath(
            '//*[@id="rel-list"]/mi-tool-bar/button[@class="btn btn-default btn-icon"]//i[@class="icon-plus"]'
        ),
        entitySearchIcon: by.xpath(
            '//mi-searchbox[@class="btn btn-icon default-buttons-left"]//i[@class="icon-search"]'
        ),
        relationshipTab: by.xpath('//mi-tab[@value="relationship-tab"]//span[text()="Relationship"]'),
        relationshipSearchIcon: by.xpath(
            '//*[@id="rel-list"]//mi-searchbox[@class="btn btn-icon"]//i[@class="icon-search"]'
        ),
        familyCaptionText: by.xpath('//input[@type="text"][contains(@data-bind,"FMLY_CAPTION")]'),
        familyFieldCaptionText: by.xpath('//input[@type="text"][contains(@data-bind,"FIELD_CAPTION_CREATE")]'),
        familyDescText: by.xpath('//input[@type="text"][contains(@data-bind,"FMLY_DESC")]'),
        familyFieldDescText: by.xpath('//input[@type="text"][contains(@data-bind,"FIELD_DESC_CREATE")]'),
        saveFamilyIcon: by.xpath('//button[@class="btn btn-icon" and @title="Save"]//i[@class="icon-save"]'),
        errorPopupMessage: by.xpath(
            '//div[@class="error-accumulator-container"]//span[@data-bind="text:errorMessage"]'
        ),
        errorPopupCloseIcon: by.xpath('//i[@class="icon-close-popup error-accumulator-container-close-mark"]'),
        familyManagementTabCloseIcon: by.xpath(
            '//div[@class="route-tab"]//li[@title="Family Management"]//i[@class="tab-close ds ds-cross"]'
        ),
        searchEntityIcon: by.xpath(
            '//*[@id="entity-tree"]//mi-searchbox[@class="btn btn-icon default-buttons-left"]//i[@class="icon-search"]'
        ),
        searchRelationshipIcon: by.xpath(
            '//*[@id="rel-list"]//mi-searchbox[@class="btn btn-icon"]//i[@class="icon-search"]'
        ),
        searchBox: by.xpath('//input[@class="form-control mi-searchbox"]'),
        addNewField: by.xpath('//mi-resultgrid/div[1]/div[1]/mi-tool-bar[2]/button[2]/i'),
        saveFieldButton: by.xpath('//button[@id="savefield"]'),
        deleteFieldButton: by.xpath('//*[@id="right-panel"]/div[1]/div/div/div[1]/div[1]/div/button[1]/i'),
        oKConfirmDeleteButton: by.xpath('//div/div/section/div[@class="btn btn-primary two-buttons okButtonClass"]')
    };

    async verifyFamilyManagementHeaderPresent(): Promise<void> {
        Logger.debug('Verifying Family Management Header');
        return waitUntilVisible(this.locators.familyManagementHeader);
    }

    async deleteField(caption: string): Promise<void> {
        Logger.debug('delete field', caption);
        await waitForThenClick(this.locators.deleteFieldButton);
        return waitForThenClick(this.locators.oKConfirmDeleteButton);
    }

    async addNewField(caption: string, description: string): Promise<void> {
        Logger.debug('Adding new field');
        await waitForThenClick(this.locators.addNewField);
        return this.populateFamilyFieldDetails(caption, description);
    }

    async addEntity(caption: string, description: string): Promise<void> {
        Logger.debug('Adding Entity');
        await waitForThenClick(this.locators.addEntityIcon);
        await this.populateFamilyDetails(caption, description);
        return waitForThenClick(this.locators.saveFamilyIcon);
    }

    async addRelationship(caption: string, description: string): Promise<void> {
        Logger.debug('Adding Relationship');
        await this.clickRelationshipTab();
        await waitForThenClick(this.locators.addRelationshipIcon);
        await this.populateFamilyDetails(caption, description);
        return waitForThenClick(this.locators.saveFamilyIcon);
    }

    async populateFamilyDetails(caption: string, description: string): Promise<void> {
        Logger.debug('Filling in Family Caption and Description');
        await element(this.locators.familyCaptionText).sendKeys(caption);
        return element(this.locators.familyDescText).sendKeys(description);
    }

    async populateFamilyFieldDetails(caption: string, description: string): Promise<void> {
        Logger.debug('Filling in Family Field Caption and Description');
        await element(this.locators.familyFieldCaptionText).sendKeys(caption);
        return element(this.locators.familyFieldDescText).sendKeys(description);
    }

    async clickRelationshipTab(): Promise<void> {
        Logger.debug('Clicking Relationship Tab');
        return waitForThenClick(this.locators.relationshipTab);
    }

    async closeAndReopenFamilyManagement(): Promise<void> {
        await common.closeTabWithoutSavingChangesOk('Family Management');
        Logger.debug('Reopening Family Management');
        return leftNav.openFamilyManagement();
    }

    async verifyEntitySearchResults(family: string): Promise<void> {
        await waitForThenClick(this.locators.searchEntityIcon);
        return this.verifySearchResults(family);
    }

    async verifyRelationshipSearchResults(family: string): Promise<void> {
        await this.clickRelationshipTab();
        await waitForThenClick(this.locators.searchRelationshipIcon);
        return this.verifySearchResults(family);
    }

    private async verifySearchResults(family: string): Promise<void> {
        const locator = "//span[@class='system-ellipsis-text' and text()='replaceText']".replace('replaceText', family);
        Logger.debug('Searching for Family');
        await waitForThenClick(this.locators.searchBox);
        await element(this.locators.searchBox).sendKeys(family);
        return waitUntilVisible(element(locator));
    }
}
