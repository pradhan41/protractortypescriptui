import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './unified-base.conf';

export const config = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'unifieddev-smokeuser',
                password: 'Pa55w0rd',
                url: 'https://apmdev.int-app.aws-usw02-pr.predix.io/unifieddev'
            },
            hositeuser: {
                username: 'HOSITEUSER',
                password: 'Meridium1',
                url: 'https://apmdev.int-app.aws-usw02-pr.predix.io/unifieddev'
            },
            coremechint: {
                username: 'CoreMechIntUser',
                password: 'GEDig_16',
                url: 'https://apmdev.int-app.aws-usw02-pr.predix.io/unifieddev'
            },
            metric: {
                username: 'CoreMIMetric',
                password: 'GEDig_16',
                url: 'https://apmdev.int-app.aws-usw02-pr.predix.io/unifieddev'
            }
        }
    })
});
