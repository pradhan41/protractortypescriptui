import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick } from '@ge-apm-m/tziki/lib/protractor';

export class LeftNav {
    private locators = {
        toolsIcon: by.xpath('//div[@title="Tools"]'),
        adminIcon: by.xpath('//div[@title="Admin"]'),
        configurationManagerIcon: by.xpath('//a/span[text()="Configuration Manager"]'),
        operationsManagerIcon: by.xpath('//a/span[text()="Operations Manager"]'),
        familyManagementIcon: by.xpath('//a[text()="Family Management"]'),
        searchConfigurationIcon: by.xpath('//a[text()="Search Configuration"]'),
        queryDesignerIcon: by.xpath('//a/span[text()="Queries"]'),
        advancedSearch: by.xpath('//a/span[text()="Advanced Search"]'),
        catalogIcon: by.xpath('//a/span[text()="Catalog"]')
    };

    async openQueryOverview(): Promise<void> {
        Logger.info('Navigating to Query Designer Overview');
        await this.clickToolsIcon();
        return this.clickQueryMenuItem();
    }

    async openFamilyManagement(): Promise<void> {
        Logger.info('Navigating to Family Management');
        await this.clickAdminIcon();
        await this.clickConfigurationManagerMenuItem();
        return this.clickFamilyManagementMenuItem();
    }

    async openCatalog(): Promise<void> {
        Logger.info('Navigating to the Catalog');
        await this.clickToolsIcon();
        return this.clickCatalogMenuItem();
    }

    async openSearchConfiguration(): Promise<void> {
        Logger.info('Navigating to Search Configuration');
        await this.clickAdminIcon();
        await this.clickOperationsManagerMenuItem();
        return this.clickSearchConfigurationMenuItem();
    }

    async openAdvancedSearch(): Promise<void> {
        Logger.info('Navigating to Advanced Search');
        await this.clickToolsIcon();
        return this.clickAdvancedSearchMenuItem();
    }

    private async clickToolsIcon(): Promise<void> {
        Logger.debug('Clicking Tools icon');
        return waitForThenClick(this.locators.toolsIcon);
    }

    private async clickAdminIcon(): Promise<void> {
        Logger.debug('Clicking Admin icon');
        return waitForThenClick(this.locators.adminIcon);
    }

    private async clickQueryMenuItem(): Promise<void> {
        Logger.debug('Clicking Query Designer icon');
        return waitForThenClick(this.locators.queryDesignerIcon);
    }

    private async clickConfigurationManagerMenuItem(): Promise<void> {
        Logger.debug('Clicking Configuration Manager icon');
        await waitForThenClick(this.locators.configurationManagerIcon);
    }

    private async clickOperationsManagerMenuItem(): Promise<void> {
        Logger.debug('Clicking Operations Manager icon');
        await waitForThenClick(this.locators.operationsManagerIcon);
    }

    private async clickFamilyManagementMenuItem(): Promise<void> {
        Logger.debug('Clicking Family Management icon');
        await waitForThenClick(this.locators.familyManagementIcon);
    }

    private async clickSearchConfigurationMenuItem(): Promise<void> {
        Logger.debug('Clicking Search Configuration icon');
        await waitForThenClick(this.locators.searchConfigurationIcon);
    }

    private async clickCatalogMenuItem(): Promise<void> {
        Logger.debug('Clicking Catalog icon');
        await waitForThenClick(this.locators.catalogIcon);
    }

    private async clickAdvancedSearchMenuItem(): Promise<void> {
        Logger.debug('Clicking Advanced Search icon');
        await waitForThenClick(this.locators.advancedSearch);
    }
}
