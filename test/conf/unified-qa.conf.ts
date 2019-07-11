import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'unifiedqa-admin',
                password: 'Pa55w0rd',
                url: 'https://apmqa.int-app.aws-usw02-pr.predix.io/unifiedqa'
            },
            hositeuser: {
                username: 'HOSITEUSER',
                password: 'Meridium1',
                url: 'https://apmqa.int-app.aws-usw02-pr.predix.io/unifiedqa'
            },
            coremechint: {
                username: 'CoreMechIntUser',
                password: 'GEDig_16',
                url: 'https://apmqa.int-app.aws-usw02-pr.predix.io/unifiedqa'
            },
            metric: {
                username: 'CoreMIMetric',
                password: 'GEDig_16',
                url: 'https://apmqa.int-app.aws-usw02-pr.predix.io/unifiedqa'
            }
        }
    })
});
