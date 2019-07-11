import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { ResultGrid } from './result-grid';

const resultGrid = new ResultGrid();

export class QueryResults {
    private locators = {
        queryResultsActiveTab: by.xpath(
            "//div[contains(@class, 'query-editor')]//*[contains(@class, 'editor-nav')]//li[contains(@class, 'active')]//a[text()='Results']"
        )
    };

    async waitUntilReady(): Promise<void> {
        Logger.info('Wait until Query Results are ready');
        await waitUntilVisible(this.locators.queryResultsActiveTab);
        await resultGrid.waitUntilReady();
        return resultGrid.waitUntilFinishedLoading();
    }

    async isReady(): Promise<boolean> {
        Logger.debug('Asking if Query Results are ready');
        return resultGrid.isReady();
    }

    async isLoading(): Promise<boolean> {
        Logger.debug('Asking if Query Results are loading');
        return resultGrid.isLoading();
    }
}
