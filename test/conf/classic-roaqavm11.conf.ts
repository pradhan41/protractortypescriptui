import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './classic-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'MIADMIN',
                password: 'Usability',
                url: 'http://roaqavm11.meridium.com/meridium/',
                datasource: 'V4030100_TEST_MON_SQL14'
            },
            hositeuser: {
                username: 'HOSITEUSER',
                password: 'Meridium1',
                url: 'http://roaqavm11.meridium.com/meridium/',
                datasource: 'V4030100_TEST_MON_SQL14'
            },
            coremechint: {
                username: 'CoreMechIntUser',
                password: 'GEDig_16',
                url: 'http://roaqavm11.meridium.com/meridium/',
                datasource: 'V4030100_TEST_MON_SQL14'
            },
            metric: {
                username: 'CoreMIMetric',
                password: 'GEDig_16',
                url: 'http://roaqavm11.meridium.com/meridium/',
                datasource: 'V4030100_TEST_MON_SQL14'
            }
        }
    })
});
