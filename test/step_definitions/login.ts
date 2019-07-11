import { expect } from 'chai';
import { LeftNav } from '@pages/left-nav';

declare const protractor: any;
const EC = protractor.ExpectedConditions;

export = function() {
    /* Given ---------------------------------------------------------------- */

    this.Given(/^the user has navigated to APM$/, () => {
        const { url } = browser.params.accounts.admin;
        const { apm } = browser.params.pages();
        return apm.open(url);
    });

    this.Given(/^the user has logged in$/, () => {
        const { apm } = browser.params.pages();
        return expect(apm.waitUntilReady()).to.be.fulfilled;
    });

    this.Given(/^the user has not logged in$/, () => {
        const { loginPage } = browser.params.pages();
        return expect(loginPage.waitUntilReady()).to.be.fulfilled;
    });

    /* When ----------------------------------------------------------------- */

    this.When(/^the user logs in with valid credentials$/, () => {
        const { username, password } = browser.params.accounts.admin;
        const { loginPage } = browser.params.pages();
        return loginPage.logIn(username, password);
    });

    this.When(/^the user logs in as (?:a|an) "([^"]*)"$/, acccount => {
        const { username, password } = browser.params.accounts[acccount];
        const { loginPage } = browser.params.pages();
        return loginPage.logIn(username, password);
    });

    this.When(/^the user logs out$/, () => {
        const { leftNav } = browser.params.pages();
        return leftNav.logOut();
    });

    this.When(/^the test waits for the current environment to be up and running$/, async () => {
        const { admin } = browser.params.accounts;
        const { loginManager } = browser.params.pages();
        const waitTime = parseFloat(process.env.WAIT_TIME_IN_MINUTES) || 60;
        const interval = parseFloat(process.env.INTERVAL_IN_MINUTES) || 3;
        return loginManager.waitForLogin(admin, { waitTime, interval });
    });

    /* Then ----------------------------------------------------------------- */

    this.Then(/^the user is logged in$/, () => {
        const { apm } = browser.params.pages();
        return expect(apm.waitUntilReady()).to.be.fulfilled;
    });

    this.Then(/^the user is not logged in$/, () => {
        const { loginPage } = browser.params.pages();
        return expect(loginPage.waitUntilReady()).to.be.fulfilled;
    });
};
