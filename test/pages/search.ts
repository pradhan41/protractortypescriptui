import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { TopNavMainTabs } from './top-nav-main-tabs';

const topNavMainTabs = new TopNavMainTabs();

export class Search {
    private locators = {
        openSearch: by.css('#shell-screen .top-nav .top-nav-right-icons .right-top-icon-two a.search-icon'),
        textbox: by.css('#shell-screen .top-nav .search-overlay .search-input'),
        search: by.css('#shell-screen .top-nav .search-overlay .search-options-current-selection'),
        searchResult: (value: string) =>
            by.cssContainingText('#shell-screen .top-nav .search-overlay .global-search-results', value),
        searchResultLink: by.css('.list-group-item-heading a')
    };

    async searchFor(value: string): Promise<void> {
        Logger.info('Searching for', value);
        Logger.debug('Clicking on open search button');
        await waitForThenClick(this.locators.openSearch);
        Logger.debug('Waiting for search text box');
        await waitUntilVisible(this.locators.textbox);
        Logger.debug('Entering', value, 'into search text box');
        await element(this.locators.textbox).sendKeys(value);
        Logger.debug('Clicking search');
        await waitForThenClick(this.locators.search);
        return browser.sleep(1000);
    }

    inSearchResults(value: string): Promise<void> {
        const expectedValue = true;
        element(by.xpath('//span[text()="No results found"]'))
            .isPresent()
            .then(result => {
                Logger.debug('Waiting for', value, 'to appear in search results and check search results:', result);
                if (expectedValue === result) {
                    browser.sleep(60000);
                    waitForThenClick(this.locators.search);
                } else {
                    browser.sleep(1000);
                }
            });
        return waitUntilVisible(this.locators.searchResult(value));
    }

    async open(value: string): Promise<void> {
        Logger.info(`Opening item matching '${value}' in global search results`);

        const result = element(this.locators.searchResult(value));
        const link = await result.element(this.locators.searchResultLink);

        // Open the link and wait for the tab to open.
        const tabCount = await topNavMainTabs.getTabCount();
        await waitForThenClick(link);
        return topNavMainTabs.waitForTabN(tabCount + 1);
    }
}
