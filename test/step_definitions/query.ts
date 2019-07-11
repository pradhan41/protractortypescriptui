import { expect } from 'chai';
import { LeftNav } from '@pages/left-nav';
import { Catalog } from '@pages/catalog';
import { Query } from '@pages/query';
import { QueryConditionsGrid } from '@pages/query-conditions-grid';
import { QueryOverview } from '@pages/query-overview';
import { QueryRelatedSourceDialog } from '@pages/query-related-source-dialog';
import { ResultGrid } from '@pages/result-grid';
import { QueryResults } from '@pages/query-results';
import { QuerySourceDesigner } from '@pages/query-source-designer';
import { QuerySourceDialog } from '@pages/query-source-dialog';
const queries = require('../data/predefined-queries.json');

const leftNav = new LeftNav();
const conditionsGrid = new QueryConditionsGrid();
const overview = new QueryOverview();
const relatedSourceDialog = new QueryRelatedSourceDialog();
const sourceDesigner = new QuerySourceDesigner();
const sourceDialog = new QuerySourceDialog();
const query = new Query();
const results = new QueryResults();
const catalog = new Catalog();
const resultGrid = new ResultGrid();

export = function() {
    this.Given(/^the user opens the action query "([^"]*)" in query designer$/, async (catalogItemPath: string) => {
        await catalog.openCatalogItem(catalogItemPath);
        return query.waitUntilDesignerReady();
    });

    this.Given(/^the user opens the query "([^"]*)" in query designer$/, async (catalogItemPath: string) => {
        await catalog.openCatalogItem(catalogItemPath);
        await results.waitUntilReady();
        await query.navigateToQueryTab('Design');
        return query.waitUntilDesignerReady();
    });

    this.Given(/^the user sets the limit to "([^"]*)"$/, async (limitValue: string) => {
        return conditionsGrid.setLimit(limitValue);
    });

    this.When(/^the user opens the query overview screen$/, async () => {
        return leftNav.openQueryOverview();
    });

    this.When(/^the user views recent query "([^"]*)"$/, async (caption: string) => {
        await leftNav.openQueryOverview();
        return query.openRecentQuery(caption);
    });

    this.When(/^the user runs the query$/, async () => {
        return query.executeQuery();
    });

    this.When(/^the user creates a graph$/, async () => {
        return query.createGraph();
    });

    this.When(/^the user creates a query from SQL "(.*)"$/, async (sql: string) => {
        await leftNav.openQueryOverview();
        await overview.createNewQuery();
        await query.waitUntilNewQueryDesignerReady();
        await sourceDialog.close();
        await query.navigateToQueryTab('SQL');
        return query.typeSqlStatement(sql);
    });

    this.When(/^the user creates a query from the predefined SQL "([^"]*)"$/, async (jsonElementName: string) => {
        await leftNav.openQueryOverview();
        await overview.createNewQuery();
        await query.waitUntilNewQueryDesignerReady();
        await sourceDialog.close();
        await query.navigateToQueryTab('SQL');
        return query.typeSqlStatement(queries[jsonElementName]);
    });

    this.When(/^the user opens a new query in the designer$/, async () => {
        await leftNav.openQueryOverview();
        await overview.createNewQuery();
        return query.waitUntilNewQueryDesignerReady();
    });

    this.When(/^the user adds the family "([^"]*)" to the current query$/, async (family: string) => {
        const isSourceDlgDisplayed = await sourceDialog.isReady();
        if (!isSourceDlgDisplayed) await query.openQuerySourceDialog();
        return sourceDialog.addFamily(family);
    });

    this.When(/^the user adds the fields? "([^"]*)" to the current query$/, async (field: string) => {
        const fields = field.split(',');
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            await conditionsGrid.addField(field.trim());
        }
    });

    this.When(
        /^the user adds the advanced criteria "([^"]*)" to the field "([^"]*)" of the current query$/,
        async (criteria: string, field: string) => {
            return conditionsGrid.addAdvancedConditionToField(criteria, field);
        }
    );

    this.When(
        /^the user clicks the include checkbox to the field "([^"]*)" of the current query$/,
        async (field: string) => {
            return conditionsGrid.invertIncludeForField(field);
        }
    );

    this.When(
        /^the user sets total type to "([^"]*)" for the field "([^"]*)" of the current query$/,
        async (totalType: string, field: string) => {
            return conditionsGrid.setTotalTypeForField(totalType, field);
        }
    );

    this.When(
        /^the user adds a related source to the "([^"]*)" source of the current query$/,
        async (family: string) => {
            await sourceDesigner.waitUntilReady();
            await sourceDesigner.addRelatedFamilySource(family);
            return relatedSourceDialog.waitUntilFinishedLoading();
        }
    );

    this.When(/^the user selects the query design tab$/, async () => {
        await query.navigateToQueryTab('Design');
        return query.waitUntilDesignerReady();
    });

    this.Then(/^the query overview header is shown$/, async () => {
        return expect(overview.verifyQueryOverviewHeaderPresent()).to.have.been.fulfilled;
    });

    this.Then(/^the query results are displayed$/, async () => {
        await results.waitUntilReady();
        return expect(results.isReady()).to.have.been.fulfilled;
    });

    this.Then(/^the query results contain the value "([^"]*)"$/, async (value: string) => {
        await resultGrid.waitUntilReady();
        return expect(resultGrid.isDataValueDisplayedOnAnyPage(value)).to.eventually.be.true;
    });

    this.Then(/^the query results do not contain the value "([^"]*)"$/, async (value: string) => {
        await resultGrid.waitUntilReady();
        return expect(resultGrid.isDataValueDisplayedOnAnyPage(value)).to.eventually.be.false;
    });

    this.Then(
        /^the query results do not contain the value "([^"]*)" in the first "([^"]*)" pages$/,
        async (value: string, pageDepth: number) => {
            await resultGrid.waitUntilReady();
            return expect(resultGrid.isDataValueDisplayedOnAnyPage(value, pageDepth)).to.eventually.be.false;
        }
    );

    this.Then(/^the query results contain the columns? "([^"]*)"$/, async (column: string) => {
        const captions = column.split(',');
        return Promise.all(
            captions.map(async caption => {
                return expect(resultGrid.isColumnDisplayed(caption.trim())).to.eventually.be.true;
            })
        );
    });

    this.Then(
        /^the query results contain the value "([^"]*)" in the column "([^"]*)"$/,
        async (value: string, column: string) => {
            await resultGrid.waitUntilReady();
            return expect(resultGrid.isDataValueDisplayedInColumnOfAnyPage(value, column)).to.eventually.be.true;
        }
    );

    this.Then(
        /^the query results do not contain the value "([^"]*)" in the column "([^"]*)"$/,
        async (value: string, column: string) => {
            await resultGrid.waitUntilReady();
            return expect(resultGrid.isDataValueDisplayedInColumnOfAnyPage(value, column)).to.eventually.be.false;
        }
    );

    this.Then(
        /^the query results do not contain the value "([^"]*)" in the column "([^"]*)" in the first "([^"]*)" pages$/,
        async (value: string, column: string, pageDepth: number) => {
            await resultGrid.waitUntilReady();
            return expect(resultGrid.isDataValueDisplayedInColumnOfAnyPage(value, column, pageDepth)).to.eventually.be
                .false;
        }
    );

    this.Then(/^the user sees query error popup$/, async () => {
        return expect(query.verifyErrorPopupVisible()).to.be.fulfilled;
    });

    this.Then(/^the query designer should be displayed$/, async () => {
        await query.waitUntilDesignerReady();
        return expect(query.verifyTabIsActive('Design')).to.be.fulfilled;
    });

    this.Then(/^the available sources include the "([^"]*)" famil(?:y|ies)$/, async (families: string) => {
        const familyArray = families.split(',');
        await sourceDialog.waitUntilFinishedLoading();
        return Promise.all(
            familyArray.map(async family => {
                await sourceDialog.searchForFamily(family.trim());
                return expect(sourceDialog.isFamilyPresentInSearchResults(family.trim())).to.eventually.be.true;
            })
        );
    });

    this.Then(/^the available sources do not include the "([^"]*)" famil(?:y|ies)$/, async (families: string) => {
        const familyArray = families.split(',');
        await sourceDialog.waitUntilFinishedLoading();
        return Promise.all(
            familyArray.map(async family => {
                await sourceDialog.searchForFamily(family.trim());
                await expect(sourceDialog.isFamilyPresentInSearchResults(family.trim())).to.eventually.be.false;
            })
        );
    });

    this.Then(/^the available related sources include the "([^"]*)" famil(?:y|ies)$/, async (families: string) => {
        const familyArray = families.split(',');
        await relatedSourceDialog.waitUntilFinishedLoading();
        return Promise.all(
            familyArray.map(async family => {
                return expect(relatedSourceDialog.isFamilyPresent(family.trim())).to.eventually.be.true;
            })
        );
    });

    this.Then(
        /^the available related sources do not include the "([^"]*)" famil(?:y|ies)$/,
        async (families: string) => {
            const familyArray = families.split(',');
            await relatedSourceDialog.waitUntilFinishedLoading();
            return Promise.all(
                familyArray.map(async family => {
                    await expect(relatedSourceDialog.isFamilyPresent(family.trim())).to.eventually.be.false;
                })
            );
        }
    );
};
