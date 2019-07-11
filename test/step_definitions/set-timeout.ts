import { Logger } from '@ge-apm-m/tziki/lib/logger';

export = function() {
    const timeout = getTimeout();
    Logger.info('Cucumber timeout is', timeout / 1000.0, 'seconds');
    this.setDefaultTimeout(timeout);
};

function getTimeout() {
    const DEFAULT_TIMEOUT_MS = 2 * 60 * 1000;
    const waitForAppTimeout = global['WAIT_FOR_APP_TIMEOUT'];
    return waitForAppTimeout ? waitForAppTimeout : DEFAULT_TIMEOUT_MS;
}
