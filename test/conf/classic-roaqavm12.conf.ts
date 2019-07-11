import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './classic-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'MIADMIN',
                password: 'Usability',
                url: 'http://roaqavm12.meridium.com/meridium/',
                datasource: 'V4030006_TEST_QA_LAST'
            }
        }
    })
});
