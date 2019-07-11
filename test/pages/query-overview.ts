import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class QueryOverview {
    private locators = {
        queryOverviewHeader: by.xpath('//*[@id="shell-screen"]/section/section/div/div[@class=\'query-landing-page\']'),
        createNew: by.xpath(
            "//*[contains(@class, 'query-nav')]//a[contains(@class, 'btn-primary') and text()='Create New']"
        )
    };

    async verifyQueryOverviewHeaderPresent(): Promise<void> {
        Logger.debug('Verifying Query Overview Header');
        return waitUntilVisible(this.locators.queryOverviewHeader);
    }

    async createNewQuery(): Promise<void> {
        Logger.debug('Clicking Create New');
        return waitForThenClick(this.locators.createNew);
    }
}
