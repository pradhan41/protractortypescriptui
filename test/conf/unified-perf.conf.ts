import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'unifiedperf2',
                password: 'welcome1',
                url: 'https://apmperf.int-app.aws-usw02-pr.predix.io/unifiedperf2'
            }
        }
    })
});
