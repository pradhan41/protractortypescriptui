import { expect } from 'chai';
import { FamilyManagement } from '@pages/family-management';
import { Behaviors } from '@pages/behaviors';
import { LeftNav } from '@pages/left-nav';

const familyManagement = new FamilyManagement();
const behaviors = new Behaviors();
const leftNav = new LeftNav();

export = function() {
    this.Given(/^the user has navigated to Family Management$/, () => {
        return leftNav.openFamilyManagement();
    });

    this.When(
        /^the user creates a new entity family with caption "([^"]*)" and description "([^"]*)"$/,
        async (caption: string, description: string) => {
            return expect(familyManagement.addEntity(caption, description)).to.be.fulfilled;
        }
    );

    this.When(
        /^the user creates a new relationship family with caption "([^"]*)" and description "([^"]*)"$/,
        async (caption: string, description: string) => {
            return expect(familyManagement.addRelationship(caption, description)).to.be.fulfilled;
        }
    );

    this.When(/^the user reloads the page$/, async () => {
        return expect(familyManagement.closeAndReopenFamilyManagement()).to.be.fulfilled;
    });

    this.Then(/^no search results should be displayed for entity family "([^"]*)"$/, async family => {
        return expect(familyManagement.verifyEntitySearchResults(family)).to.be.rejected;
    });

    this.Then(/^no search results should be displayed for relationship family "([^"]*)"$/, async family => {
        return expect(familyManagement.verifyRelationshipSearchResults(family)).to.be.rejected;
    });

    this.When(
        /^the user adds a new field "([^"]*)" with a description of "([^"]*)"$/,
        async (caption: string, description: string) => {
            await behaviors.selectFieldTab();
            const result = await behaviors.findField(caption, 'Caption');
            if (result) {
                await familyManagement.deleteField(caption);
            }
            return familyManagement.addNewField(caption, description);
        }
    );
};
