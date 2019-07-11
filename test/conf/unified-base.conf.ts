import { customize } from '@ge-apm-m/tziki/lib/core';
import * as base from './common-base.conf';

export const config: any = customize(base.config, {
    params: {
        environment: 'unified',
        pages: () => require('@pages/index-unified'),
        data: () => require('../data')
    }
});
