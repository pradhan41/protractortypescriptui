import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class QuerySourceDialog {
    private LOADING_TIMEOUT = 45000; // 45 seconds

    private locators = {
        sourceDialog: by.xpath(
            "//*[@class='dialog-wrapper']//*[@class='title-container' and text()='Select a Family or Query']"
        ),
        cancel: by.xpath("//*[@class='query-source-dialog']//*[contains(@class, 'controls')]//button[text()='Cancel']"),
        add: by.xpath("//*[@class='query-source-dialog']//*[contains(@class, 'controls')]//button[text()='Add']"),
        familySearchBox: by.xpath("//*[contains(@class, 'query-source-families-container')]//input[@type='search']"),
        familySearchResult: family =>
            by.xpath(`//*[contains(@class, 'query-source-families-container')]//td[text()='${family}']`),
        loadingIndicator: by.xpath("//*[@class='query-source-dialog']//*[contains(@class, 'busy-indicator-wrap')]")
    };

    async waitUntilReady(): Promise<void> {
        Logger.info('Wait until Query Source dialog is ready');
        await waitUntilVisible(this.locators.sourceDialog);
    }

    async isReady(): Promise<boolean> {
        Logger.debug('Asking if Query Source dialog is displayed');
        await waitUntilVisible(this.locators.sourceDialog);
        return element(this.locators.cancel).isEnabled();
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

    async addFamily(familyCaption: string): Promise<void> {
        Logger.info(`Adding source family '${familyCaption}' to the query`);
        await this.searchForFamily(familyCaption);
        await waitForThenClick(this.locators.familySearchResult(familyCaption));
        return waitForThenClick(this.locators.add);
    }

    async searchForFamily(familyCaption: string): Promise<void> {
        Logger.debug(`Searching for family ${familyCaption}`);
        const searchBox = element(this.locators.familySearchBox);
        await waitForThenClick(searchBox);
        await searchBox.clear();
        return searchBox.sendKeys(familyCaption);
    }

    async isFamilyPresentInSearchResults(familyCaption: string): Promise<boolean> {
        Logger.debug(`Asking if family '${familyCaption}' is present in search results`);
        const searchResult = element(this.locators.familySearchResult(familyCaption));
        return searchResult.isPresent();
    }
}
