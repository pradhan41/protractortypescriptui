import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class QueryRelatedSourceDialog {
    private LOADING_TIMEOUT = 45000; // 45 seconds
    private locators = {
        relatedSourceDialog: by.xpath(
            "//*[@class='dialog-wrapper']//*[@class='title-container' and text()='Add Related Source']"
        ),
        cancel: by.xpath("//*[@class='dialog-wrapper']//*[contains(@class, 'controls')]//button[text()='Cancel']"),
        add: by.xpath("//*[@class='dialog-wrapper']//*[contains(@class, 'controls')]//button[text()='Add']"),
        familyList: by.xpath("//*[contains(@class, 'related-families-container')]"),
        familyInList: family => by.xpath(`//*[contains(@class, 'related-families-container')]//td[text()='${family}']`),
        familyWithRelationshipInList: (family, relationship) =>
            by.xpath(
                `//*[contains(@class, 'related-families-container')]//td[text()='${family}']/following-sibling::td[text()='${relationship}']`
            ),
        loadingIndicator: by.xpath(
            "//*[contains(@class, 'query-related-source-dialog')]//*[contains(@class, 'load-spinner')]"
        )
    };

    async waitUntilReady(): Promise<void> {
        Logger.info('Wait until Query Related Source dialog is ready');
        await waitUntilVisible(this.locators.relatedSourceDialog);
    }

    async isLoading(): Promise<boolean> {
        Logger.debug('Asking if Query Source dialog is loading');
        const spinner = element(this.locators.loadingIndicator);
        return spinner.isDisplayed();
    }

    async waitUntilFinishedLoading(timeoutMs: number = this.LOADING_TIMEOUT): Promise<void> {
        Logger.debug('Wait until Query Source dialog is finished loading');

        await this.waitUntilReady();

        const EC = protractor.ExpectedConditions;
        const spinner = await element(this.locators.loadingIndicator);
        return browser.wait(EC.invisibilityOf(spinner), timeoutMs);
    }

    async close(): Promise<void> {
        Logger.debug('Closing Query Source dialog');
        return waitForThenClick(this.locators.cancel);
    }

    async addFamily(family: string): Promise<void> {
        Logger.info(`Adding related source family '${family}' to the query`);
        await waitForThenClick(this.locators.familyInList(family));
        return waitForThenClick(this.locators.add);
    }

    async addFamilyThroughRelationship(family: string, relationship: string): Promise<void> {
        Logger.info(`Adding related source family '${family}' through relationship '${relationship}'`);
        await waitForThenClick(this.locators.familyWithRelationshipInList(family, relationship));
        return waitForThenClick(this.locators.add);
    }

    async isFamilyPresent(family: string): Promise<boolean> {
        Logger.debug(`Asking if family '${family}' is present in search results`);
        const listItem = element(this.locators.familyInList(family));
        return listItem.isPresent();
    }

    async isFamilyWithRelationshipPresent(family: string, relationship: string): Promise<void> {
        Logger.debug(`Asking if family '${family}' with relationship '${relationship}' is present in search results`);
        const listItem = element(this.locators.familyWithRelationshipInList(family, relationship));
        return listItem.isPresent();
    }
}
