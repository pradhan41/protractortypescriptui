import { customize } from '@ge-apm-m/tziki/lib/core';
import {
    apm,
    leftNav as tzikiLeftNav,
    loginManager as tzikiLoginManager,
    loginPage
} from '@ge-apm-m/tziki/lib/classic';

import { Catalog } from '@pages/catalog';
import { QueryOverview } from '@pages/query-overview';
import { Query } from '@pages/query';
import { QueryConditionsGrid } from './query-conditions-grid';
import { QueryRelatedSourceDialog } from '@pages/query-related-source-dialog';
import { QueryResults } from '@pages/query-results';
import { QuerySourceDesigner } from '@pages/query-source-designer';
import { QuerySourceDialog } from '@pages/query-source-dialog';
import { ResultGrid } from '@pages/result-grid';
import { Search } from '@pages/search';
import { createWaitForLogin } from './wait-for-login';
import { LeftNav } from './left-nav';

const queryOverview = new QueryOverview();
const queryConditionsGrid = new QueryConditionsGrid();
const queryRelatedSourceDialog = new QueryRelatedSourceDialog();
const querySourceDesigner = new QuerySourceDesigner();
const querySourceDialog = new QuerySourceDialog();
const search = new Search();
const resultGrid = new ResultGrid();
const queryResults = new QueryResults();
const query = new Query();
const catalog = new Catalog();
const leftNav = customize(tzikiLeftNav, new LeftNav());
const loginManager = customize(tzikiLoginManager, { waitForLogin: createWaitForLogin({ apm, loginPage }) });

export {
    apm,
    catalog,
    leftNav,
    loginManager,
    loginPage,
    query,
    queryConditionsGrid,
    queryOverview,
    queryRelatedSourceDialog,
    queryResults,
    querySourceDesigner,
    querySourceDialog,
    resultGrid,
    search
};
