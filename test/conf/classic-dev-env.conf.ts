import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './classic-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'MIADMIN',
                password: 'Usability',
                url: 'http://localhost/meridium/',
                datasource: 'V4030100_QA'
            },
            hositeuser: {
                username: 'HOSITEUSER',
                password: 'Meridium1',
                url: 'http://localhost/meridium/',
                datasource: 'V4030100_QA'
            },
            coremechint: {
                username: 'CoreMechIntUser',
                password: 'GEDig_16',
                url: 'http://localhost/meridium/',
                datasource: 'V4030100_QA'
            },
            metric: {
                username: 'CoreMIMetric',
                password: 'GEDig_16',
                url: 'http://localhost/meridium/',
                datasource: 'V4030100_QA'
            }
        }
    })
});
