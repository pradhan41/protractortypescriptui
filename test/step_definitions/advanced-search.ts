import { LeftNav } from '@pages/left-nav';
import { AdvancedSearch } from '@pages/advanced-search';
import { ResultGrid } from '@pages/result-grid';
import { Common } from '@pages/common';
import { expect } from 'chai';

const common = new Common();
const advancedSearch = new AdvancedSearch();
const leftNav = new LeftNav();
const resultGrid = new ResultGrid();

export = function() {
    this.Given(/^the user creates a new advanced search for family "([^"]*)"$/, async (family: string) => {
        await leftNav.openAdvancedSearch();
        await advancedSearch.waitUntilReady();
        await advancedSearch.createNewSearch(family);
        return advancedSearch.waitUntilFormIsReady();
    });

    this.Given(
        /^the user creates a new advanced search for family "([^"]*)" linked to "([^"]*)" through "([^"]*)"$/,
        async (family: string, link: string, through: string) => {
            await leftNav.openAdvancedSearch();
            await advancedSearch.waitUntilReady();
            await advancedSearch.createLinkedSearch(family, link, through);
            return advancedSearch.waitUntilFormIsReady();
        }
    );

    this.Given(
        /^the user adds a condition for family "([^"]*)" field "([^"]*)" condition "([^"]*)"$/,
        async (family: string, field: string, condition: string) => {
            return advancedSearch.addCondition(family, field, condition, null);
        }
    );

    this.Given(
        /^the user adds a condition for family "([^"]*)" field "([^"]*)" condition "([^"]*)" value "([^"]*)"$/,
        async (family: string, field: string, condition: string, value: string) => {
            return advancedSearch.addCondition(family, field, condition, value);
        }
    );

    this.Given(/^the user adds linked family "([^"]*)" through "([^"]*)"$/, async (link: string, through: string) => {
        await advancedSearch.addLinkToExistingSearch(link, through);
        return advancedSearch.waitUntilFormIsReady();
    });

    this.When(/^the user runs the advanced search$/, async () => {
        return advancedSearch.execute();
    });

    this.When(
        /^the user saves the search in "([^"]*)" as "([^"]*)"$/,
        async (catalogItemPath: string, caption: string) => {
            return advancedSearch.save(catalogItemPath, caption);
        }
    );

    this.Then(/^the advanced search results are displayed$/, async () => {
        await advancedSearch.waitUntilResultsReady();
        return expect(resultGrid.isReady()).to.have.been.fulfilled;
    });

    this.Then(/^the user closes the search without saving$/, async () => {
        return advancedSearch.closeTabWithoutSavingChanges();
    });

    this.Then(/^the search should be saved successfully$/, async () => {
        await expect(advancedSearch.verifySuccessMessageIsDisplayed()).to.eventually.be.true;
        return common.confirmMessage();
    });
};
