import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { Catalog } from '@pages/catalog';
import { ResultGrid } from '@pages/result-grid';
import { waitForThenClick, waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { Common } from '@pages/common';

const common = new Common();
const resultGrid = new ResultGrid();
const catalog = new Catalog();

export class Behaviors {
    private locators = {
        searchIcon: by.xpath('//*[@id="entity-tree"]/mi-tool-bar/mi-searchbox'),
        searchTextbox: by.xpath('//input[@class="form-control mi-searchbox"]'),
        familyResult: by.xpath('//span[text()="form-control mi-searchbox"]'),
        fieldTab: by.xpath('//a[text()="Fields"]'),
        addIfBehaviorButton: by.xpath('//button[@data-testid="behavior__if__add"]'),
        addElseBehaviorButton: by.xpath('//button[@data-testid="behavior__else__add"]'),
        removeBehaviorButtonIf0: by.xpath('//button[@id="ifdelete_0"]'),
        saveButton: by.xpath('//button[@id="savefield"]'),
        toastMsg: by.xpath('//div[@id="toast-container"]/div[@class="toast toast-success"]'),
        behaviorLeftConstant: by.xpath("//input[@data-testid='behavior__left__constant']"),
        behaviorLeftDateConstant: by.xpath("//mi-date-time[@data-testid='behavior__left__constant__date']"),
        behaviorList: by.xpath("//mi-select[@data-testid='behaviors__select']"),
        formatValueList: by.xpath("//mi-select[@data-testid='behavior__format__value']"),
        customFormatValue: by.xpath("//input[@data-testid='behavior__format__input']"),
        backFieldList: by.xpath("//mi-icon[@data-testid='back__fieldList']"),
        behaviorLeftField: by.xpath("//mi-select[@data-testid='behavior__left__field']"),
        behaviorConstantField: by.xpath("//input[@data-testid='behavior__constantList__field']"),
        behaviorConstantButton: by.xpath("//button[@data-testid='behavior__constantList__button']"),
        behaviorSystemCodeList: by.xpath("//mi-select[@data-testid='behavior__SystemCodeList']"),
        behaviorSystemCodeRefList: by.xpath("//mi-select[@data-testid='behavior__SystemCodeRefList']"),
        behaviorSystemCodeRefFieldList: by.xpath("//mi-select[@data-testid='behavior__SystemCodeRefList__Field']"),
        behaviorSystemCodeRefCodeList: by.xpath("//mi-select[@data-testid='behavior__SystemCodeRefList__Code']"),
        behaviorCatalogQueryButton: by.xpath("//button[@data-testid='behavior__queryList__button']"),
        behaviorIfRightConstantDate: (index: string) => by.xpath(`//mi-date-time[@id='ifRightDate_${index}']`),
        behaviorIfLeftFieldDropDown: (index: string) => by.xpath(`//mi-select[@id='ifLeftFields_${index}']`),
        behaviorIfOperatorDropDown: (index: string) => by.xpath(`//mi-select[@id='ifOperators_${index}']`),
        behaviorIfConditionDropDown: (index: string) => by.xpath(`//mi-select[@id='ifConfigs_${index}']`),
        behaviorIfRightSecurityGroupDropDown: (index: string) =>
            by.xpath(`//mi-select[@id='ifRightSecurityGroup_${index}']`),
        behaviorElseConditionDropDown: (index: string) => by.xpath(`//mi-select[@id='elseConfigs_${index}']`),
        behaviorElseRightSecurityGroupDropDown: (index: string) =>
            by.xpath(`//mi-select[@id='elseRightSecurityGroup_${index}']`),
        defaultDateTimeNowCheckbox: by.xpath("//input[@data-testid='default__datenow']"),
        fieldGridRecordDropDown: by.xpath("//div[@data-testid='field__grid']/mi-resultgrid/div[1]/div[2]/mi-select"),
        fieldCount: by.xpath('//mi-resultgrid/div[1]/div[2]/div/div[2]'),
        DateTimeWindow: by.xpath(
            "//div[contains(@class,'bootstrap-datetimepicker-widget') and contains(@style,'display: block;')]//button[text()='Close']"
        ),
        fieldItem: (fieldItemName: string) => by.xpath(`//td[text()='${fieldItemName}']`),
        behaviorItem: (behaviorItemName: string) => by.xpath(`//div/p[text()='${behaviorItemName}']`)
    };

    async findFamily(family: string): Promise<void> {
        Logger.info('finding family', family);
        const ele: string = '//span[text()="family"]';
        await waitForThenClick(this.locators.searchIcon);
        await waitUntilVisible(this.locators.searchTextbox);
        Logger.debug('Entering', family, 'into search text box');
        await element(this.locators.searchTextbox).sendKeys(family);
        return waitForThenClick(by.xpath(ele.replace('family', family)));
    }

    async findField(field: string, column: string): Promise<boolean> {
        Logger.info('finding field', field);
        await waitForThenClick(this.locators.fieldTab);
        const result = await await resultGrid.isDataValueDisplayedInColumnOfAnyPage(field, column);
        if (result) {
            await waitForThenClick(this.locators.fieldItem(field));
            return true;
        }
        Logger.info('No field found');
        return false;
    }

    async selectFieldTab(): Promise<void> {
        Logger.info('select field tab');
        await waitForThenClick(this.locators.fieldTab);
    }

    async addConstantValue(value: string): Promise<void> {
        Logger.info('adding constant value', value);
        await element(this.locators.behaviorConstantField).sendKeys(value);
        await waitForThenClick(this.locators.behaviorConstantButton);
    }

    async selectSystemCode(code: string): Promise<void> {
        Logger.info('selecting system code', code);
        const target = element(this.locators.behaviorSystemCodeList);
        await common.byText(target, code);
    }

    async selectSystemCodeRef(ref: string, code: string): Promise<void> {
        Logger.info('selecting system ref', ref);
        Logger.info('selecting system ref code', code);
        const target = element(this.locators.behaviorSystemCodeRefList);
        await common.byText(target, ref);
        const target1 = element(this.locators.behaviorSystemCodeRefCodeList);
        await common.byText(target1, code);
    }

    async selectSystemFieldRef(ref: string, field: string): Promise<void> {
        Logger.info('selecting system ref', ref);
        Logger.info('selecting system ref field', field);
        const target = element(this.locators.behaviorSystemCodeRefList);
        await common.byText(target, ref);
        const target1 = element(this.locators.behaviorSystemCodeRefFieldList);
        await common.byText(target1, field);
    }

    async selectCatalogQuery(query: string, path: string): Promise<void> {
        await waitForThenClick(this.locators.behaviorCatalogQueryButton);
        await catalog.clickCatalogBrowserItem(query);
        await waitForThenClick(by.xpath("//button[text()='Open']"));
    }

    async findBehavior(behavior: string): Promise<void> {
        Logger.info('finding behavior', behavior);
        const target = element(this.locators.behaviorList);
        await common.byText(target, behavior);
    }

    async findFieldChooser(fields: string): Promise<void> {
        Logger.info('finding fields', fields);
        const target = element(this.locators.fieldGridRecordDropDown);
        await common.byText(target, fields);
    }

    async selectIfOperator(operator: string, index: string): Promise<void> {
        Logger.info('selecting operator', operator);
        const target = element(this.locators.behaviorIfOperatorDropDown(index));
        await common.byText(target, operator);
    }

    async selectIfCondition(condition: string, index: string): Promise<void> {
        Logger.info('selecting condition', condition);
        const target = element(this.locators.behaviorIfConditionDropDown(index));
        await common.byText(target, condition);
    }

    async selectRightIfSecurityGroup(group: string, index: string): Promise<void> {
        Logger.info('selecting group', group);
        const target = element(this.locators.behaviorIfRightSecurityGroupDropDown(index));
        await common.byText(target, group);
    }

    async selectElseCondition(condition: string, index: string): Promise<void> {
        Logger.info('selecting condition', condition);
        const target = element(this.locators.behaviorElseConditionDropDown(index));
        await common.byText(target, condition);
    }

    async selectIfLeftField(field: string, index: string): Promise<void> {
        Logger.info('selecting Left field', field);
        const target = element(this.locators.behaviorIfLeftFieldDropDown(index));
        await common.byText(target, field);
    }

    async selectRightElseSecurityGroup(group: string, index: string): Promise<void> {
        Logger.info('selecting group', group);
        const target = element(this.locators.behaviorElseRightSecurityGroupDropDown(index));
        await common.byText(target, group);
    }

    async findFormatValue(format: string): Promise<void> {
        Logger.info('selecting format', format);
        const target = element(this.locators.formatValueList);
        await common.byText(target, format);
    }

    async enterCustomFormatValue(format: string): Promise<void> {
        Logger.info('entering custom format', format);
        await element(this.locators.customFormatValue).sendKeys(format);
    }

    async findExistingBehavior(behavior: string): Promise<boolean> {
        Logger.info('checking for behavior', behavior);
        const target = element(this.locators.behaviorList);
        await waitForThenClick(target);
        const result: boolean = element(this.locators.behaviorItem(behavior)).isPresent();
        return result;
    }

    async addIfBehavior(): Promise<void> {
        return waitForThenClick(this.locators.addIfBehaviorButton);
    }

    async addElseBehavior(): Promise<void> {
        return waitForThenClick(this.locators.addElseBehaviorButton);
    }

    async addLeftConstant(value: string): Promise<void> {
        Logger.info("adding left constant of '", value, "'");
        await element(this.locators.behaviorLeftConstant).sendKeys(value);
    }

    async addLeftConstantDate(value: string): Promise<void> {
        Logger.info("adding left date constant of '", value, "'");
        await waitForThenClick(this.locators.behaviorLeftDateConstant);
        return waitForThenClick(this.locators.DateTimeWindow);
    }

    async addRightConstantDate(index: string): Promise<void> {
        Logger.info('adding current date to right date constant');
        await waitForThenClick(this.locators.behaviorIfRightConstantDate('0'));
        return waitForThenClick(this.locators.DateTimeWindow);
    }

    async addDefaultDateTimeNow(): Promise<void> {
        Logger.info('adding default datetime.now()');
        return waitForThenClick(this.locators.defaultDateTimeNowCheckbox);
    }

    async addLeftField(value: string): Promise<void> {
        Logger.info("adding default left field of '", value, "'");
        const target = element(this.locators.behaviorLeftField);
        return common.byText(target, value);
    }

    async saveBehavior(): Promise<void> {
        Logger.info('saving behavior');
        return waitForThenClick(this.locators.saveButton);
    }

    async removeIfBehavior(behavior: string): Promise<void> {
        Logger.info('removing behavior', behavior);
        await waitForThenClick(this.locators.removeBehaviorButtonIf0);
        await waitForThenClick(this.locators.saveButton);
        await this.verifyBehaviorChange();
        await waitForThenClick(this.locators.backFieldList);
    }

    async verifyBehaviorChange(): Promise<void> {
        Logger.info('verify behavior change');
        return waitUntilVisible(this.locators.toastMsg);
    }
}
