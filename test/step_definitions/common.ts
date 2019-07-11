import { expect } from 'chai';
import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { testTracker } from '@ge-apm-m/tziki/lib/core';
import { Common } from '@pages/common';

const common = new Common();
const iPadScreenWidth = 1024;
const iPadScreenHeight = 768;

export = function() {
    this.Given(/^the test "([^"]*)"\/"([^"]*)" has passed$/, (feature, scenario) => {
        Logger.info('Checking if feature', feature, 'scenario', scenario, 'passed');
        expect(testTracker.contains(feature, scenario), `feature "${feature}", scenario "${scenario}" passed`).to.be
            .true;
    });

    this.Given(/^the user has logged in with the "([^"]*)" account$/, async account => {
        const { loginManager } = browser.params.pages();
        return loginManager.ensureLogin(browser.params.accounts[account]);
    });

    // don't do this before login - the screen is automatically resized after login
    this.When(/^the user changes the screen size to iPad$/, async () => {
        return common.changeScreenSize(iPadScreenWidth, iPadScreenHeight);
    });

    this.When(/^the test (?:says|states|declares|proclaims) "(?:[^"]*)"$/, () => {
        // do nothing
    });

    this.When(/^the test saves that "([^"]*)"\/"([^"]*)" passed$/, (feature, scenario) => {
        Logger.info('Saving feature', feature, 'scenario', scenario, 'to test tracker');
        testTracker.store(feature, scenario);
    });

    this.Then(/^the test records that "([^"]*)"\/"([^"]*)" passed$/, (feature: string, scenario: string) => {
        Logger.info('Recording that feature', feature, 'scenario', scenario, 'passed');
        testTracker.store(feature, scenario);
    });

    this.Then(/^the user does not see the error dialog$/, async () => {
        const { apm } = browser.params.pages();
        return expect(apm.waitUntilErrorDialogVisible()).to.be.rejected;
    });

    this.Then(/^the user sees error dialog$/, async () => {
        const { apm } = browser.params.pages();
        expect(apm.waitUntilErrorDialogVisible()).to.be.fulfilled;
        return common.closeErrorDialog();
    });

    this.Given(/^the user closes the "([^"]*)" tab$/, async (tabName: string) => {
        return common.closeTab(tabName);
    });
};
