import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './common-base.conf';

export const config: any = customize(base.config, {
    params: {
        environment: 'onprem',
        pages: () => require('@pages/index-classic'),
        data: () => require('../data')
    }
});
