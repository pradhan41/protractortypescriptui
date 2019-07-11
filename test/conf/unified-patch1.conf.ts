import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'unifiedpatch1-admin',
                password: 'Pa55wOrd!%',
                url: 'https://apmpatch.int-app.aws-usw02-pr.predix.io/unifiedpatch1'
            }
        }
    })
});
