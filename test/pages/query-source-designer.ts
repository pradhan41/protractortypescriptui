import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class QuerySourceDesigner {
    private locators = {
        svg: by.xpath("//*[contains(@class, 'joint-paper')]//*[name()='svg']"),
        source: source =>
            by.xpath(
                `//*[contains(@class, 'joint-paper')]//*[name()='svg']//*[name()='g' and @data-type='query.Source']//*[name()='tspan' and text()='${source}']`
            ),
        addSource: by.xpath(
            "//*[contains(@class, 'joint-halo') and @data-type='query.Source']//*[contains(@class, 'addSource')]"
        )
    };

    async waitUntilReady(): Promise<void> {
        Logger.info('Wait until Query Source Designer is ready');
        return waitUntilVisible(this.locators.svg);
    }

    async isReady(): Promise<boolean> {
        Logger.debug('Asking if Query Source Designer is displayed');
        return element(this.locators.svg).isDisplayed();
    }

    async addRelatedFamilySource(parentSource: string): Promise<void> {
        Logger.info(`Adding a related family source to ${parentSource}`);
        await this.selectSourceNode(parentSource);
        return this.clickAddSource();
    }

    private async selectSourceNode(source: string): Promise<void> {
        Logger.debug(`Selecting source node ${source}`);
        await waitForThenClick(this.locators.source(source));
    }

    private async clickAddSource(): Promise<void> {
        Logger.debug('Clicking add source button of the currently selected source node');
        await waitForThenClick(this.locators.addSource);
    }
}
