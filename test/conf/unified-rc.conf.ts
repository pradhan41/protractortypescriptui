import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'sample-ud-admin',
                password: 'Pa55w0rd',
                url: 'https://apmrc.int-app.aws-usw02-pr.predix.io/sample-ud'
            }
        }
    })
});
