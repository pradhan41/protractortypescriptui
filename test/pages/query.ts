import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitForThenClick, waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';
import { QuerySourceDialog } from '@pages/query-source-dialog';

const sourceDialog = new QuerySourceDialog();

export class Query {
    private locators = {
        runIcon: by.xpath("//button[@title='Run']//i[@class='icon-play']"),
        moreOptionsIcon: by.xpath(
            "//*[contains(@class,'mi-more-options-icon btn btn-icon')]//i[@class='icon-options']"
        ),
        graphIcon: by.xpath("//*[contains(@class,'more-options-content')]//span[@class='icon-graph']"),
        queryTab: (tabName: string) =>
            by.xpath(`//*[contains(@class,'nav nav-pills editor-nav')]//a[text()='${tabName}']`),
        queryTabActive: (tabName: string) =>
            by.xpath(`//*[contains(@class,'nav nav-pills editor-nav')]//li[@class="active"]//a[text()='${tabName}']`),
        queryErrorPopup: by.xpath("//section[@class='content dialog-content dialog-with-padding message-box-content']"),
        optionsContainer: by.xpath("//div[@class='query-options-container']"),
        okButton: by.xpath("//*[contains(@class, 'okButtonClass')]"),
        viewQuery: (caption: string) => by.xpath(`//td[@aria-colindex="1"]//a[text()='${caption}']`),
        sqlDesigner: {
            sqlTextArea: by.xpath("//*[@class='query-editor']//*[@class='query-editor']//textarea")
        },
        designer: {
            addSource: by.xpath(
                "//*[@class='query-editor']//*[contains(@class, 'button-panel')]//a[@class='add-source']"
            )
        }
    };

    async executeQuery(): Promise<void> {
        Logger.debug('Clicking run query');
        return waitForThenClick(this.locators.runIcon);
    }

    async createGraph(): Promise<void> {
        Logger.debug(`Clicking create graph`);
        await waitForThenClick(this.locators.moreOptionsIcon);
        return waitForThenClick(this.locators.graphIcon);
    }

    async navigateToQueryTab(tabName: string): Promise<void> {
        Logger.debug(`Clicking the ${tabName} tab`);
        return waitForThenClick(this.locators.queryTab(tabName));
    }

    async verifyErrorPopupVisible(): Promise<void> {
        Logger.debug('Verifying query error popup is present');
        await waitUntilVisible(this.locators.queryErrorPopup);
        return waitForThenClick(this.locators.okButton);
    }

    async verifyTabIsActive(tabName: string): Promise<void> {
        Logger.debug(`Verifying tab ${tabName} is active`);
        await waitUntilVisible(this.locators.queryTabActive(tabName));
    }

    async waitUntilDesignerReady(): Promise<void> {
        return waitUntilVisible(this.locators.optionsContainer);
    }

    async openRecentQuery(caption: string): Promise<void> {
        Logger.debug(`Clicking View Query for ${caption}`);
        return waitForThenClick(this.locators.viewQuery(caption));
    }

    async waitUntilNewQueryDesignerReady(): Promise<void> {
        return sourceDialog.waitUntilFinishedLoading();
    }

    async openQuerySourceDialog(): Promise<void> {
        Logger.debug('Opening Query Source dialog');
        await waitForThenClick(this.locators.designer.addSource);
        return sourceDialog.waitUntilFinishedLoading();
    }

    async typeSqlStatement(sql: string): Promise<void> {
        Logger.info('Typing SQL into SQL Text Area');
        await waitForThenClick(this.locators.sqlDesigner.sqlTextArea);
        const sqlTextArea = element(this.locators.sqlDesigner.sqlTextArea);
        return sqlTextArea.sendKeys(sql);
    }
}
