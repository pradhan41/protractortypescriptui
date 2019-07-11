import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible, waitUntilClickable } from '@ge-apm-m/tziki/lib/protractor';

export class SearchConfiguration {
    private locators = {
        excludeCheckbox: by.xpath('//input[@type="checkbox"][contains(@data-bind,"checked: exclude")]'),
        saveSearchConfigButton: by.xpath('//button[@class="btn btn-text" and text()="Save"]'),
        searchFamilyIcon: by.xpath(
            '//*[@title="Families"]//mi-searchbox[@class="btn btn-icon default-buttons-left"]//i[@class="icon-search"]'
        ),
        okButton: by.xpath("//*[contains(@class, 'okButtonClass')]"),
        familyInList: (family: string) => by.xpath(`//span[text()="${family}"]`),
        rebuildIndedWarning: by.xpath("//*[contains(@class, 'rebuild-warning-span displayed')]"),
        searchBox: by.xpath('//input[@class="form-control mi-searchbox"]')
    };

    async invertExclude(caption: string): Promise<void> {
        await this.searchForFamilyInNav(caption);
        Logger.info('Clicking Exclude Checkbox');
        await waitForThenClick(this.locators.excludeCheckbox);
    }

    async saveSearchConfig(): Promise<void> {
        Logger.debug('Clicking Save Button');
        await waitForThenClick(this.locators.saveSearchConfigButton);
        return waitForThenClick(this.locators.okButton);
    }

    async verifyRebuildWarning(): Promise<void> {
        Logger.debug('Verifying Rebuild Index Warning');
        return waitUntilVisible(this.locators.rebuildIndedWarning);
    }

    private async searchForFamilyInNav(caption: string) {
        Logger.info(`Searching for family ${caption}`);
        await waitUntilClickable(this.locators.searchFamilyIcon);
        await waitForThenClick(this.locators.searchFamilyIcon);
        await waitForThenClick(this.locators.searchBox);
        await element(this.locators.searchBox).sendKeys(caption);
        return waitForThenClick(this.locators.familyInList(caption));
    }
}
