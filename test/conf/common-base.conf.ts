import 'module-alias/register';
import 'dotenv/config';
import makeDir from 'make-dir';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { screenSize } from '@ge-apm-m/tziki/lib/chrome';
import { ifEnvElse, testKey, OptionalPromise, ScreenSize } from '@ge-apm-m/tziki/lib/core';
import { Logger } from '@ge-apm-m/tziki/lib/logger';

chai.use(chaiAsPromised);

const browserSize: ScreenSize = { width: 1366, height: 768 };

/*
 * Default configuration, see https://github.com/angular/protractor/blob/master/lib/config.ts for more information
 * on these and other available settings.
 */
export const config: any = {
    /*
     * Hooks, see below
     */
    beforeLaunch,
    onPrepare,
    onComplete,
    onCleanUp,
    afterLaunch,

    /*
     * The address of a running Selenium Server. If specified, Protractor will connect to an already running instance
     * of Selenium. This usually looks like seleniumAddress: 'http://localhost:4444/wd/hub'
     */
    seleniumAddress: 'http://localhost:4444/wd/hub',

    /*
     * If true, Protractor will connect directly to the browser Drivers at the locations specified by chromeDriver and
     * firefoxPath. Only Chrome and Firefox are supported for direct connect.
     */
    directConnect: true,

    /*
     * Required. Spec patterns are relative to the location of this config.
     *
     * Example:
     * specs: [
     *   'spec/*_spec.js'
     * ]
     */
    specs: ['../features/*.feature', '../features/*.feature'],

    /*
     * Patterns to exclude specs.
     */
    exclude: [],

    /*
     * Alternatively, suites may be used. When run without a command line parameter, all suites will run. If run with
     * --suite=smoke or --suite=smoke,full only the patterns matched by the specified suites will run.
     *
     * Example:
     * suites: {
     *   smoke: 'spec/smoketests/*.js',
     *   full: 'spec/*.js'
     * }
     */
    suites: {
        // doNotExplode: ['../features/do-not-explode.feature'],
        // help: ['../features/help.feature'],
        // aca: [],
        // prereq: ['../features/pre-asset.feature', '../../common/features/pre-search.feature'],
        // search: ['../features/search.feature'],
        // asset: ['../features/asset.feature'],
        // metrics: ['../features/metrics-scorecards.feature'],
        // tm: ['../features/tm-calculation.feature'],
        // waitForApp: ['../features/wait-for-app.feature'],
        advancedSearch: ['../features/advanced-search/*.feature'],
        behaviors: ['../features/dcm/behavior-*.feature'],
        familyManagement: ['../features/dcm/family-*.feature'],
        query: ['../features/query/*.feature'],
        siteReference: ['../features/site-reference/*.feature'],
        searchConfig: ['../features/search-configuration/*.feature']
    },

    /*
     * Hooks running in the background
     */
    plugins: [{ path: '../../node_modules/proui-utils/Compressed_Utils/GeneralHook.js' }],

    /*
     * Protractor can launch your tests on one or more browsers. If you are testing on a single browser, use the
     * capabilities option. If you are testing on multiple browsers, use the multiCapabilities array.
     *
     * For a list of available capabilities, see
     * https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
     */
    capabilities: {
        browserName: 'chrome',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1,
        chromeOptions: {
            args: ifEnvElse(
                'CHROME_HEADLESS',
                () => [
                    '--disable-web-security',
                    '--ignore-autocomplete-off-autofill',
                    '--headless',
                    '--no-sandbox',
                    screenSize(browserSize)
                ],
                () => ['--disable-web-security', '--ignore-autocomplete-off-autofill', screenSize(browserSize)]
            ),
            prefs: {
                download: {
                    prompt_for_download: false,
                    directory_upgrade: true,
                    default_directory: '../../../downloads'
                }
            }
        }
    },

    /*
     * The timeout in milliseconds for each script run on the browser. This should be longer than the maximum time your
     * application needs to stabilize between tasks.
     */
    allScriptsTimeout: 2 * 60 * 1000 + 5000,

    /*
     * How long to wait for a page to load.
     */
    getPageTimeout: 2 * 60 * 5000,

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    },

    /*
     * Test framework to use. This may be one of: jasmine, mocha or custom.
     *
     * When the framework is set to "custom" you'll need to additionally set frameworkPath with the path relative to
     * the config file or absolute:
     *
     *   framework: 'custom',
     *   frameworkPath: './frameworks/my_custom_jasmine.js',
     *
     * See github.com/angular/protractor/blob/master/lib/frameworks/README.md to comply with the interface details of
     * your custom implementation.
     */
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: ['../../node_modules/proui-utils/Compressed_Utils/Reporter.js', '../step_definitions/**/*.js']
    }
};

/*
 * A callback function called once configs are read but before any environment setup. This will only run once, and
 * before onPrepare.
 *
 * You can specify a file containing code to run by setting beforeLaunch to the filename string.
 *
 * At this point, global variable 'protractor' object will NOT be set up, and globals from the test framework will NOT
 * be available. The main purpose of this function should be to bring up test dependencies.
 */
function beforeLaunch(): void {
    // do nothing
}

/*
 * A callback function called once protractor is ready and available, and before the specs are executed. If multiple
 * capabilities are being run, this will run once per capability.
 *
 * You can specify a file containing code to run by setting onPrepare to the filename string. onPrepare can optionally
 * return a promise, which Protractor will wait for before continuing execution. This can be used if the preparation
 * involves any asynchronous calls, e.g. interacting with the browser. Otherwise Protractor cannot guarantee order of
 * execution and may start the tests before preparation finishes.
 *
 * At this point, global variable 'protractor' object will be set up, and globals from the test framework will be
 * available.
 *
 * If you need access back to the current configuration object, use a pattern like the following:
 *
 *    return browser.getProcessedConfig().then(function(config) {
 *      // config.capabilities is the CURRENT capability being run, if
 *      // you are using multiCapabilities.
 *      console.log('Executing capability', config.capabilities);
 *    });
 */
async function onPrepare(): Promise<void> {
    browser.ignoreSynchronization = true;
    browser.manage().deleteAllCookies();
    browser
        .manage()
        .timeouts()
        .pageLoadTimeout(20 * 5000);
    browser
        .manage()
        .timeouts()
        .implicitlyWait(1 * 5000);
    browser.driver
        .manage()
        .window()
        .setSize(browserSize.width, browserSize.height);

    Logger.info('Test key for current run:', testKey);
    global['Logger'] = require('proui-utils').Logger;

    await configureIsItUpNowTimeout();
    await makeReportDir();
}

async function configureIsItUpNowTimeout(): Promise<void> {
    const waitTimeInMinutes = parseFloat(process.env.WAIT_TIME_IN_MINUTES) || 60;
    const intervalInMinutes = parseFloat(process.env.INTERVAL_IN_MINUTES) || 3;
    const config = await browser.getProcessedConfig();
    if (config.suite === 'waitForApp') {
        global['WAIT_FOR_APP_TIMEOUT'] = (waitTimeInMinutes + intervalInMinutes * 2) * 60 * 5000;
    }
}

async function makeReportDir(): Promise<string | void> {
    return makeDir('./Reports/').catch(error => console.log(error));
}

/*
 * A callback function called once tests are finished. onComplete can optionally return a promise, which Protractor
 * will wait for before shutting down webdriver.
 *
 * At this point, tests will be done but global objects will still be available.
 */
function onComplete(): OptionalPromise<void> {
    // do nothing
}

/*
 * A callback function called once the tests have finished running and the WebDriver instance has been shut down. It is
 * passed the exit code (0 if the tests passed). This is called once per capability.
 */
function onCleanUp(exitCode: number): void {
    // do nothing
}

/*
 * A callback function called once all tests have finished running and the WebDriver instance has been shut down. It is
 * passed the exit code (0 if the tests passed). afterLaunch must return a promise if you want asynchronous code to be
 * executed before the program exits. This is called only once before the program exits (after onCleanUp).
 */
function afterLaunch(exitCode: number): OptionalPromise<void> {
    // do nothing
}
