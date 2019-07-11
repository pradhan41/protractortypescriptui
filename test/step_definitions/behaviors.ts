import { expect } from 'chai';
import { Behaviors } from '@pages/behaviors';

const behaviors = new Behaviors();

export = function() {
    this.When(/^the user selects the field tab$/, async () => {
        return behaviors.selectFieldTab();
    });

    this.When(/^the user selects the "([^"]*)" family$/, async (family: string) => {
        return behaviors.findFamily(family);
    });

    this.When(
        /^the user adds a new behavior "([^"]*)" to the "([^"]*)" field$/,
        async (behavior: string, field: string) => {
            await behaviors.selectFieldTab();
            await behaviors.findField(field, 'ID');
            const eb: string = `${behavior}*`;
            const result = await behaviors.findExistingBehavior(eb);
            if (result) {
                await behaviors.findBehavior(eb);
                await behaviors.removeIfBehavior(eb);
                await behaviors.findField(field, 'ID');
            }
            await behaviors.findBehavior(behavior);
            return behaviors.addIfBehavior();
        }
    );

    this.When(/^the user selects "([^"]*)" from the field display drop down$/, async (value: string) => {
        return behaviors.findFieldChooser(value);
    });

    this.When(/^the user saves the behavior$/, async () => {
        return behaviors.saveBehavior();
    });

    this.When(/^the user enters "([^"]*)" in the left constant field$/, async (value: string) => {
        return behaviors.addLeftConstant(value);
    });

    this.When(/^the user enters "([^"]*)" in the left constant date field$/, async (value: string) => {
        return behaviors.addLeftConstantDate(value);
    });

    this.When(/^the user selects default current date checkbox$/, async () => {
        return behaviors.addDefaultDateTimeNow();
    });

    this.When(/^the user enters "([^"]*)" as the custom format$/, async (format: string) => {
        return behaviors.enterCustomFormatValue(format);
    });

    this.When(/^the user selects "([^"]*)" from the format value drop down$/, async (format: string) => {
        return behaviors.findFormatValue(format);
    });

    this.When(/^the user enters "([^"]*)" for the left field$/, async (value: string) => {
        return behaviors.addLeftField(value);
    });

    this.When(/^the user selects "([^"]*)" for the Operator$/, async (operator: string) => {
        return behaviors.selectIfOperator(operator, '0');
    });

    this.When(/^the user selects "([^"]*)" for the Condition$/, async (condition: string) => {
        return behaviors.selectIfCondition(condition, '0');
    });

    this.When(/^the user selects "([^"]*)" for the Left Field$/, async (field: string) => {
        return behaviors.selectIfLeftField(field, '0');
    });

    this.When(/^the user selects todays date for the right constant$/, async () => {
        return behaviors.addRightConstantDate('0');
    });

    this.When(/^the user adds "([^"]*)" for the constant list$/, async (value: string) => {
        return behaviors.addConstantValue(value);
    });

    this.When(/^the user selects "([^"]*)" for the system code list$/, async (value: string) => {
        return behaviors.selectSystemCode(value);
    });

    this.When(
        /^the user selects "([^"]*)" for the system code ref list and "([^"]*)" for the code$/,
        async (value: string, code: string) => {
            return behaviors.selectSystemCodeRef(value, code);
        }
    );

    this.When(/^the user selects "([^"]*)" as the query$/, async (query: string) => {
        return behaviors.selectCatalogQuery(query, '');
    });

    this.When(
        /^the user selects "([^"]*)" for the system code ref list and "([^"]*)" for the field$/,
        async (value: string, field: string) => {
            return behaviors.selectSystemFieldRef(value, field);
        }
    );

    this.When(/^the user adds a new "([^"]*)" behavior$/, async (condition: string) => {
        if (condition === 'If') {
            return behaviors.addIfBehavior();
        }
        return behaviors.addElseBehavior();
    });

    this.When(
        /^the user configures "([^"]*)" and "([^"]*)" for the "([^"]*)" behavior$/,
        async (condition: string, group: string, ifElse: string) => {
            if (ifElse === 'Else') {
                await behaviors.selectElseCondition(condition, '0');
                return behaviors.selectRightElseSecurityGroup(group, '0');
            }
            await behaviors.selectIfCondition(condition, '0');
            return behaviors.selectRightIfSecurityGroup(group, '0');
        }
    );

    this.When(
        /^the user removes a behavior "([^"]*)" to the "([^"]*)" field in family "([^"]*)"$/,
        async (behavior: string, field: string, family: string) => {
            await behaviors.findFamily(family);
            await behaviors.findField(field, 'ID');
            await behaviors.findBehavior(behavior);
            return behaviors.removeIfBehavior(behavior);
        }
    );

    this.Then(/^the behavior will be saved successfully$/, async () => {
        return expect(behaviors.verifyBehaviorChange()).to.be.fulfilled;
    });
};
