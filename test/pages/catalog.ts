import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible, scrollParentToChild, Locator } from '@ge-apm-m/tziki/lib/protractor';
import { LeftNav } from '@pages/left-nav';
import { Common } from '@pages/common';
import { TopNavMainTabs } from '@pages/top-nav-main-tabs';

const leftNav = new LeftNav();
const common = new Common();
const topNavMainTabs = new TopNavMainTabs();

declare type CatalogFolderPath = string[];
declare type CatalogPath = {
    folderPathArray: CatalogFolderPath;
    catalogItemId: string;
};

export class Catalog {
    private LOADING_TIMEOUT = 50000; // milliseconds

    private locators = {
        navigation: {
            header: {
                catalogTitle: by.xpath("//div[@class='list-group-item cat-root']//span[text()='Catalog']"),
                iconBackArrow: by.xpath("//button[contains(@class,'left')]//i[@class='icon-back-arrow']"),
                iconPlus: by.xpath("//button[contains(@class,'left')]//i[@class='icon-plus']"),
                iconSearch: by.xpath("//*[contains(@class,'left')]//i[@class='icon-search']"),
                iconUpArrow: by.xpath("//*[contains(@class,'left')]//i[@class='icon-up-arrow']"),
                iconCollapse: by.xpath("//i[@class='icon-collapse']"),
                iconMoreOptions: by.xpath("//i[@class='icon-options']"),
                navScrollContainer: by.xpath("//mi-tree//mi-list-group//div[@class='list-group']"),
                searchBox: by.xpath('//input[@class="form-control mi-searchbox"]')
            },
            folder: (folderName: string) =>
                by.xpath(
                    `//*[contains(@class, 'catalog-nav-container')]//mi-li[descendant-or-self::span[text()='${folderName}']]`
                ),
            folderListGroupSpinner: by.xpath(
                "//div[@class='tree-list-control']//mi-list-group[contains(@class,'nav-list-group') and contains(@class,'loading')]"
            ),
            folderGroupChildren: by.css(
                'div.tree-list-control > mi-list-group.nav-list-group > div.list-group > mi-li'
            ),
            lastChildFolder: by.css(
                'div.tree-list-control > mi-list-group.nav-list-group > div.list-group > mi-li:last-of-type'
            ),
            spinner: by.xpath("//mi-tree//mi-list-group/div[@class='loading-small']")
        },
        details: {
            actions: {
                deleteButton: by.xpath(
                    "//button[contains(@class, 'btn btn-primary') and @title='Delete selected item(s)']//i[@class='icon-bin']"
                ),
                successMessage: by.xpath("//div[contains(@class, 'title-container') and @title='Success']")
            },
            catalogItem: (catalogItemName: string) => by.linkText(`${catalogItemName}`),
            catalogItemCheckbox: (catalogItemName: string) => () =>
                by.xpath(`//a[text()='${catalogItemName}']/../preceding-sibling::td[@class='td-checkbox']`),
            catalogBrowserItem: (catalogItemName: string) => by.xpath(`//td[text()='${catalogItemName}']`)
        }
    };

    async openCatalogItem(catalogItemPath: string): Promise<void> {
        Logger.info(`Opening catalog item ${catalogItemPath}`);

        await leftNav.openCatalog();

        // Open the catalog folder
        const path = this.prepareCatalogPath(catalogItemPath);
        await this.navigateFolderHierarchy(path.folderPathArray);

        // Open the catalog item
        const tabCount = await topNavMainTabs.getTabCount();
        await this.clickCatalogItem(path.catalogItemId);
        return topNavMainTabs.waitForTabN(tabCount + 1);
    }

    private prepareCatalogPath(catalogPath: string, containsItemId: boolean = true): CatalogPath {
        const pathArray = catalogPath.split('\\\\');
        const catalogItem = containsItemId ? pathArray.pop() : '';

        return {
            folderPathArray: pathArray,
            catalogItemId: catalogItem
        };
    }

    async deleteCatalogItem(catalogItemPath: string): Promise<void> {
        await leftNav.openCatalog();

        const path = this.prepareCatalogPath(catalogItemPath);

        await this.navigateFolderHierarchy(path.folderPathArray);
        Logger.info(`Deleting catalog item: ${path.catalogItemId}`);

        await this.clickCatalogItemCheckbox(path.catalogItemId);
        await waitForThenClick(this.locators.details.actions.deleteButton);
        return common.confirmMessage();
    }

    openFolder(catalogFolderPath: string): Promise<void> {
        const path = this.prepareCatalogPath(catalogFolderPath, false);
        return this.navigateFolderHierarchy(path.folderPathArray);
    }

    private async navigateFolderHierarchy(folderPath: CatalogFolderPath): Promise<void> {
        Logger.debug('Clicking catalog Home');
        await this.waitUntilReady();
        await waitForThenClick(this.locators.navigation.folder('Home'));

        for (let i = 0; i < folderPath.length; i++) {
            const folderName = folderPath[i];
            await this.waitUntilFinishedLoading();
            await this.clickFolder(folderName);
        }

        return this.waitUntilFinishedLoading();
    }

    // Scroll to the bottom of the current nav tree menu
    private async scrollNavToBottom(): Promise<number> {
        Logger.debug('Scrolling catalog folders to trigger load');
        const numMatches = await element.all(this.locators.navigation.folderGroupChildren).count();
        if (numMatches <= 0) return 0;

        await scrollParentToChild(
            this.locators.navigation.header.navScrollContainer,
            this.locators.navigation.lastChildFolder
        );
        await this.waitUntilFinishedLoading();
        return numMatches;
    }

    private async scrollNavIfNeeded(folderName: string): Promise<void> {
        // Since this nav is lazy loaded, we can't use scrollParentToChild until everything is present
        // (And no, this is probably not the best way to handle this...)
        await this.lazyLoadEntireNavBranch();

        // after loading the whole nav branch, see if we can scroll (yes, again) to get what we need
        const e = await element(this.locators.navigation.folder(folderName));
        const isDisplayed = await e.isDisplayed();
        if (!isDisplayed) {
            return scrollParentToChild(
                this.locators.navigation.header.navScrollContainer,
                this.locators.navigation.folder(folderName)
            );
        }
    }

    private async lazyLoadEntireNavBranch(): Promise<void> {
        let previousMatches = await this.scrollNavToBottom();
        let newMatches = 0;
        while (true) {
            newMatches = await this.scrollNavToBottom();
            if (newMatches === previousMatches) break;
            else previousMatches = newMatches;
        }
    }

    private async clickFolder(folderName: string): Promise<void> {
        Logger.debug(`Clicking catalog folder '${folderName}'`);

        await this.scrollNavIfNeeded(folderName);
        return waitForThenClick(this.locators.navigation.folder(folderName));
    }

    isReady(): Promise<boolean> {
        Logger.debug('Asking if catalog is ready');
        return this.isLoading();
    }

    waitUntilReady(): Promise<void> {
        Logger.debug('Wait until catalog is ready');
        return this.waitUntilFinishedLoading();
    }

    private async waitUntilFinishedLoading(timeoutMs: number = this.LOADING_TIMEOUT): Promise<void> {
        Logger.debug('Wait until catalog is finished loading');

        if (await this.isLoading()) {
            const EC = protractor.ExpectedConditions;
            await browser.sleep(1000); // not ideal, but the spinner has some issues...
            return browser.wait(EC.not(this.isLoading));
        }
    }

    private async isLoading(): Promise<boolean> {
        try {
            await element(this.locators.navigation.folderListGroupSpinner);
            return true;
        } catch {
            return false;
        }
    }

    private clickCatalogItem(catalogItemName: string): Promise<void> {
        Logger.debug(`Clicking catalog item '${catalogItemName}'`);
        return waitForThenClick(this.locators.details.catalogItem(catalogItemName));
    }

    private clickCatalogItemCheckbox(catalogItemName: string): Promise<void> {
        Logger.debug(`Clicking checkbox for catalog item '${catalogItemName}'`);
        return waitForThenClick(this.locators.details.catalogItemCheckbox(catalogItemName));
    }

    clickCatalogBrowserItem(catalogItemName: string): Promise<void> {
        Logger.debug(`Clicking catalog item '${catalogItemName}'`);
        return waitForThenClick(this.locators.details.catalogBrowserItem(catalogItemName));
    }

    verifySuccessMessageIsDisplayed(): Promise<void> {
        Logger.info('Verifying success message is displayed');
        return waitUntilVisible(this.locators.details.actions.successMessage);
    }
}
