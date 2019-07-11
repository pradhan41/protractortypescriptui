import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'prodsampleu-qe1-admin',
                password: 'Pa55w0rd',
                url: 'https://apmprod.apm.aws-usw02-pr.predix.io/prodsampleu-qe1'
            }
        }
    })
});
