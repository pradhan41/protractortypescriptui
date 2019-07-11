import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './classic-base.conf';

export const config: any = customize(base.config, {
    params: customize(base.config.params, {
        accounts: {
            admin: {
                username: 'bl',
                password: 'bl',
                url: 'https://devcluster3.internalapmnow.com/meridium/',
                datasource: 'AUTOMATION'
            }
        }
    })
});
