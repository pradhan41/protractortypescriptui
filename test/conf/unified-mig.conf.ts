import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'migsampleu-qe1-admin',
                password: 'Pa55w0rd',
                url: 'https://apmmig.int-app.aws-usw02-pr.predix.io/migsampleu-qe1'
            }
        }
    })
});
