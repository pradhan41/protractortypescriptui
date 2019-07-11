import { expect } from 'chai';
import { SearchConfiguration } from '@pages/search-configuration';
import { LeftNav } from '@pages/left-nav';

const searchConfig = new SearchConfiguration();
const leftNav = new LeftNav();

export = function() {
    this.Given(/^the user has navigated to Search Configuration$/, () => {
        return leftNav.openSearchConfiguration();
    });

    this.When(/^the user excludes family "([^"]*)" from the search results$/, async (caption: string) => {
        return expect(searchConfig.invertExclude(caption)).to.be.fulfilled;
    });

    this.When(/^the user includes family "([^"]*)" in the search results$/, async (caption: string) => {
        return expect(searchConfig.invertExclude(caption)).to.be.fulfilled;
    });

    this.When(/^the user saves the search configuration$/, async () => {
        return expect(searchConfig.saveSearchConfig()).to.be.fulfilled;
    });

    this.Then(/^the rebuild index warning is displayed$/, async () => {
        return expect(searchConfig.verifyRebuildWarning()).to.be.fulfilled;
    });
};
