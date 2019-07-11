import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick } from '../../node_modules/@ge-apm-m/tziki/lib/protractor';

export class RecordManagerCreateRecord {
    private locators = {
        addRecord: by.xpath("//a[contains(@class, 'add-record-icon')]"),
        familySearchBox: by.xpath("//*[@class='add-record-overlay']//*[@class='global-search']//input"),
        familySearchButton: by.xpath(
            "//*[@class='add-record-overlay']//*[@class='global-search']//i[@class='icon-search']"
        ),
        searchResult: (family: string) =>
            by.xpath(
                `//*[@class='add-record-overlay']//*[@class='global-search-results-add-rm']//a[@class='new-record-link' and text()='${family}']`
            )
    };

    beginRecordCreation(): Promise<void> {
        Logger.info('Clicking Add Record');
        return waitForThenClick(this.locators.addRecord);
    }

    async searchForFamily(family: string): Promise<void> {
        Logger.info(`Searching for family '${family}' in create record drop-down`);
        const familySearch = element(this.locators.familySearchBox);
        await waitForThenClick(familySearch);
        await familySearch.clear();
        await familySearch.sendKeys(family);
        return this.waitForSearchToComplete();
    }

    private waitForSearchToComplete(): Promise<void> {
        // This is not ideal, but there's no way to know when the results
        // have been filtered.
        return browser.sleep(500);
    }

    async isFamilyInResults(family: string): Promise<boolean> {
        Logger.info(`Asking if family '${family}' is listed in results`);

        try {
            const familyResult = element(this.locators.searchResult(family));
            return await familyResult.isDisplayed();
        } catch (error) {
            Logger.warn(`Unable to find the specified value. Details: ${error}`);
            return false;
        }
    }
}
