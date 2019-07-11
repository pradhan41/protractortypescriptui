import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { leftNav } from '@ge-apm-m/tziki/lib/classic'; // import { leftNav } from '@ge-apm-m/tziki/lib/sequoia';
import { waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';

const APP_OPEN_TIMEOUT = 2 * 60 * 1000;
const WAIT_FOR_LOGO_TIMEOUT = 2 * 60 * 1000;

export type WaitForLogin = (account: ApmAccount, times: Times) => Promise<void>;
export type Times = { waitTime: Minutes; interval: Minutes };
export type Pages = { apm: Apm; loginPage: LoginPage };
export type FirstPage = Apm | LoginPage;

export function createWaitForLogin(pages: Pages): WaitForLogin {
    return (account: ApmAccount, times: Times) => waitForApp(pages, account, times);
}

async function waitForApp(pages: Pages, account: ApmAccount, times: Times): Promise<void> {
    const isSuccessful = await tryUntilSuccessOrTimeout(pages, account, times);
    if (!isSuccessful) {
        return tryOneMoreTime(pages, account);
    }
}

async function tryUntilSuccessOrTimeout(pages: Pages, account: ApmAccount, times: Times): Promise<boolean> {
    notifyStarting(account, times);
    const startTime = Date.now();
    let isSuccessful = await tryOpenApp(pages, account);
    while (!isSuccessful && isTimeRemaining(startTime, times)) {
        isSuccessful = await waitAndTryAgain(pages, account, times);
    }
    return isSuccessful;
}

function notifyStarting({ url }: ApmAccount, { interval, waitTime }: Times): void {
    Logger.info('Checking if', url, 'is available every', interval, 'minute(s), for', waitTime, 'minute(s)');
}

async function tryOpenApp(pages: Pages, account: ApmAccount): Promise<boolean> {
    try {
        await openApp(pages, account);
        Logger.info('Application is available');
        return true;
    } catch {
        Logger.error('Application is not available');
        return false;
    }
}

async function openApp({ apm, loginPage }: Pages, { username, password, url }: ApmAccount): Promise<void> {
    notifyAccessAttempt();
    await apm.open(url);
    const firstPage = await waitForLoginOrApp({ apm, loginPage });
    if (firstPage === loginPage) {
        await loginPage.logIn(username, password);
    }
    return waitUntilReady(apm);
}

async function waitUntilReady(apm: Apm): Promise<void> {
    Logger.info('Waiting for the application to be ready');
    await waitUntilLogoPresent();
    const waitInSeconds = 5;
    Logger.debug('Waiting', waitInSeconds, 'seconds for application to stabilize');
    return browser.sleep(waitInSeconds * 1000);
}

async function waitUntilLogoPresent(): Promise<void> {
    Logger.debug('Waiting for logo on left nav to be visible');
    const locator = leftNav.locators.logo;
    return waitUntilVisible(locator, WAIT_FOR_LOGO_TIMEOUT);
}

function notifyAccessAttempt(): void {
    Logger.debug('Trying to access the application at', new Date().toUTCString());
}

async function waitForLoginOrApp({ apm, loginPage }: Pages): Promise<FirstPage> {
    Logger.debug('Waiting for application or login page to load');
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.or(apm.isReady, loginPage.isReady), APP_OPEN_TIMEOUT);
    return (await loginPage.isReady()) ? loginPage : apm;
}

function isTimeRemaining(startTime: DateValue, { waitTime }: Times): boolean {
    const endTime = new Date(startTime + minutesToMilliseconds(waitTime)).getTime();
    return startTime < endTime;
}

function minutesToMilliseconds(minutes: Minutes): Milliseconds {
    return minutes * 60 * 1000;
}

async function waitAndTryAgain(pages: Pages, account: ApmAccount, times: Times): Promise<boolean> {
    await wait(times);
    return tryOpenApp(pages, account);
}

function wait({ interval }: Times): Promise<void> {
    Logger.info('Waiting', interval, 'minute(s) to try again');
    return browser.sleep(minutesToMilliseconds(interval));
}

async function tryOneMoreTime(pages: Pages, account: ApmAccount): Promise<void> {
    Logger.info('Giving up, trying to log in one more time to force a failure and screenshot.');
    return openApp(pages, account);
}
