import { expect } from 'chai';
import { Catalog } from '@pages/catalog';
import { Common } from '@pages/common';

const common = new Common();
const catalog = new Catalog();

export = function() {
    this.When(/^the user opens the query "([^"]*)" from the catalog$/, async (catalogItemPath: string) => {
        return catalog.openCatalogItem(catalogItemPath);
    });

    this.When(/^the user opens the search "([^"]*)" from the catalog$/, async (catalogItemPath: string) => {
        return catalog.openCatalogItem(catalogItemPath);
    });

    this.When(/^the user deletes "([^"]*)" from the catalog$/, async (catalogItemPath: string) => {
        return catalog.deleteCatalogItem(catalogItemPath);
    });

    this.Then(/^the catalog item should be deleted successfully$/, async () => {
        await expect(catalog.verifySuccessMessageIsDisplayed()).to.eventually.be.true;
        return common.confirmMessage();
    });
};
