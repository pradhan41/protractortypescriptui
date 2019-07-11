import { expect } from 'chai';
import { appendTestKey } from '@ge-apm-m/tziki/lib/core';
import { Search } from '@pages/search';
import { SiteReference } from '@pages/site-reference';

const search = new Search();
const siteReference = new SiteReference();

export = function() {
    /* When ----------------------------------------------------------------- */

    this.When(/^the user searches for the test record "([^"]*)"$/, (searchText: string) => {
        return search.searchFor(appendTestKey(searchText));
    });

    this.When(/^the user searches for and opens the test record "([^"]*)"$/, async (searchText: string) => {
        await search.searchFor(searchText);
        return search.open(searchText);
    });

    /* Then ----------------------------------------------------------------- */

    this.Then(/^the test record "([^"]*)" appears in the search dropdown$/, (searchText: string) => {
        return expect(search.inSearchResults(appendTestKey(searchText))).to.eventually.be.fulfilled;
    });

    this.Then(/^the Site Reference module is opened$/, async (searchText: string) => {
        return expect(siteReference.isReady()).to.eventually.be.true;
    });
};
