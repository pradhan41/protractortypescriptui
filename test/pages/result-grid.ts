import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible, waitForThenClick, scrollParentToChild, attrContains } from '@ge-apm-m/tziki/lib/protractor';

export class ResultGrid {
    private LOADING_TIMEOUT = 5000; // milliseconds

    private locators = {
        resultGrid: by.css('mi-resultgrid'),
        resultGridScrollContainer: by.css('mi-resultgrid .dx-scrollable-container'),
        loadingPanel: by.css('mi-resultgrid .dx-overlay.dx-loadpanel'),
        pager: {
            nextPage: by.xpath(
                "//mi-resultgrid//*[contains(@class, 'dx-datagrid-pager')]//*[contains(@class, 'dx-navigate-button') and contains(@aria-label, 'Next')]"
            ),
            lastPage: by.xpath(
                "//mi-resultgrid//*[contains(@class, 'dx-datagrid-pager')]//*[contains(@class, 'dx-pages')]/*[@class='dx-page'][last()]"
            ),
            firstPage: by.xpath(
                "//mi-resultgrid//*[contains(@class, 'dx-datagrid-pager')]//*[contains(@class, 'dx-pages')]/*[@class='dx-page'][1]"
            ),
            allVisiblePages: by.xpath(
                "//mi-resultgrid//*[contains(@class, 'dx-datagrid-pager')]//*[contains(@class, 'dx-pages')]/*[contains(@class,'dx-page')]"
            )
        },
        columns: {
            columnHeadings: by.xpath("//mi-resultgrid//*[contains(@class, 'dx-datagrid-headers')]//tr//td"),
            columnHeading: (text: string) =>
                by.xpath(`//mi-resultgrid//*[contains(@class, 'dx-datagrid-headers')]//*[text()='${text}']`)
        },
        rows: {
            rows: by.xpath(
                "//mi-resultgrid//*[contains(@class, 'dx-datagrid-rowsview')]//tr[contains(@class, 'dx-data-row')]"
            ),
            row: (rowIndex: number) => {
                const rowIndex1B = rowIndex + 1; // convert to 1-based index
                return by.xpath(
                    `//mi-resultgrid//*[contains(@class, 'dx-datagrid-rowsview')]//tr[contains(@class, 'dx-data-row')][${rowIndex1B}]`
                );
            }
        },
        fields: {
            fieldValue: (text: string) =>
                by.xpath(`//mi-resultgrid//*[contains(@class, 'dx-datagrid-rowsview')]//td[text()='${text}']`),
            field: (colIndex: number, rowIndex: number) => {
                const colIndex1B = colIndex + 1; // convert to 1-based index
                const rowIndex1B = rowIndex + 1;
                return by.xpath(
                    `//mi-resultgrid//*[contains(@class, 'dx-datagrid-rowsview')]//tr[contains(@class, 'dx-data-row')][${rowIndex1B}]//td[${colIndex1B}]`
                );
            },
            fieldWithText: (colIndex: number, rowIndex: number, text: string) =>
                by.xpath(
                    `//mi-resultgrid//*[contains(@class, 'dx-datagrid-rowsview')]//tr[contains(@class, 'dx-data-row')][${rowIndex}]//td[text()='${text}'][${colIndex}]`
                )
        }
    };

    async isColumnDisplayed(columnCaption: string): Promise<boolean> {
        Logger.debug(`Asking if ResultGrid contains column '${columnCaption}'`);

        try {
            const column = await element(this.locators.columns.columnHeading(columnCaption));
            return await column.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    async isDataValueDisplayed(value: string): Promise<boolean> {
        Logger.debug(`Asking if ResultGrid is displaying the value '${value}' on the current page`);

        try {
            const dataValueLocator = this.locators.fields.fieldValue(value);
            const dataValue = await element(dataValueLocator);
            await this.scrollGridIfNeeded(dataValueLocator);
            return await dataValue.isDisplayed();
        } catch (error) {
            Logger.warn(`Unable to find the specified value. Details: ${error}`);
            return false;
        }
    }

    async isDataValueDisplayedInColumn(value: string, column: string): Promise<boolean> {
        Logger.debug(`Asking if ResultGrid contains value '${value}' in the column '${column}' of the current page`);
        const colIndex = await this.getColumnIndex(column);
        Logger.debug(`Asking each row if it contains the value '${value}' in column ${colIndex} of the current page`);
        const rows = await element.all(this.locators.rows.rows);
        // getFieldText uses a 1-based index for column and row index
        for (let i = 0; i < rows.length; i++) {
            const fieldText = await this.getFieldText(colIndex, i);
            // Logger.debug(`numRows: ${rows.length}, colNumber: ${colIndex}, rowIndex: ${i}, fieldText: ${fieldText}`);
            if (fieldText === value) return true;
        }

        return false;
    }

    async isDataValueDisplayedInColumnOfAnyPage(value: string, column: string, maxPageDepth = 5): Promise<boolean> {
        Logger.debug(`Asking if ResultGrid contains value '${value}' in the column '${column}' of any page`);

        let isVisible = await this.isDataValueDisplayedInColumn(value, column);
        if (isVisible) return true;

        isVisible = await this.checkEachPageForDataValue(value, maxPageDepth, column);
        await this.firstPage();
        return isVisible;
    }

    async isDataValueDisplayedOnAnyPage(value: string, maxPageDepth = 5): Promise<boolean> {
        Logger.debug(`Asking if ResultGrid contains value '${value}' on any page`);

        let isDisplayed = await this.isDataValueDisplayed(value);
        if (isDisplayed) return true;

        // if not there, loop through page options
        isDisplayed = await this.checkEachPageForDataValue(value, maxPageDepth, null);

        // reset to first page
        await this.firstPage();
        return isDisplayed;
    }

    private async checkEachPageForDataValue(value: string, maxPageDepth: number, column: string): Promise<boolean> {
        const numPages = await this.getPageCount();
        const maxPages = maxPageDepth > 0 ? (numPages > maxPageDepth ? maxPageDepth : numPages) : numPages;
        if (maxPages === 1) return false;

        for (let i = 0; i < maxPages; i++) {
            await this.nextPage();
            // if a specific column is requested, only check that column
            if (column === null) {
                if (await this.isDataValueDisplayed(value)) return true;
            } else {
                if (await this.isDataValueDisplayedInColumn(value, column)) return true;
            }
        }
        return false;
    }

    async isLoading(): Promise<boolean> {
        Logger.debug('Asking if ResultGrid is loading');
        return element(this.locators.loadingPanel).isDisplayed();
    }

    async isReady(): Promise<boolean> {
        Logger.debug('Asking if ResultGrid is ready');
        return element(this.locators.resultGrid).isDisplayed();
    }

    async waitUntilFinishedLoading(timeoutMs: number = this.LOADING_TIMEOUT): Promise<void> {
        Logger.debug('Wait until ResultGrid is finished loading');

        await this.waitUntilReady();

        const EC = protractor.ExpectedConditions;
        const loadingPanel = await element(this.locators.loadingPanel);
        return browser.wait(EC.invisibilityOf(loadingPanel), timeoutMs);
    }

    async waitUntilReady(): Promise<void> {
        Logger.debug('Wait until ResultGrid is ready');
        return waitUntilVisible(this.locators.resultGrid);
    }

    private async nextPage(): Promise<void> {
        Logger.debug('Going to next ResultGrid page');
        await waitForThenClick(this.locators.pager.nextPage);
        return this.waitUntilFinishedLoading();
    }

    private async firstPage(): Promise<void> {
        Logger.debug('Going to first ResultGrid page');
        if ((await this.getPageCount()) === 1) return;

        await waitForThenClick(this.locators.pager.firstPage);
        return this.waitUntilFinishedLoading();
    }

    private async getColumnIndex(columnCaption: string): Promise<number> {
        Logger.debug(`Asking which column contains the caption '${columnCaption}'`);
        const columns = await element.all(this.locators.columns.columnHeadings);
        for (let i = 0; i < columns.length; i++) {
            const column = columns[i];
            const columnText: string = await column.getText();
            if (columnText.toLocaleLowerCase() === columnCaption.toLocaleLowerCase()) return i;
        }
        return -1; // not found
    }

    private async getFieldText(colIndex: number, rowIndex: number): Promise<string> {
        const fieldLocator = this.locators.fields.field(colIndex, rowIndex);
        const field = await element(fieldLocator);
        await this.scrollGridIfNeeded(fieldLocator);
        const isDisplayed = await field.isDisplayed();
        if (isDisplayed) {
            return this.getDisplayedFieldText(field);
        }
    }

    private async getDisplayedFieldText(field: any): Promise<string> {
        // check for checkbox data
        const classes = await field.getAttribute('class');
        if (
            classes
                .toString()
                .split(' ')
                .indexOf('dx-editor-cell') > 0
        ) {
            const innerField = await field.element(by.xpath('./div[contains(@class, "dx-checkbox")]'));
            return innerField.getAttribute('aria-checked');
        }
        return field.getText();
    }

    private async getPageCount(): Promise<number> {
        // If there is only one page, there is no last page
        const visiblePages = await element.all(this.locators.pager.allVisiblePages).count();
        if (visiblePages === 1) return 1;

        // See how many items are in the page selector
        const lastPage = element(this.locators.pager.lastPage);
        await waitUntilVisible(lastPage);
        const count = await lastPage.getText();
        return +count;
    }

    private async scrollGridIfNeeded(locator: any): Promise<void> {
        const e = await element(locator);
        const isDisplayed = await e.isDisplayed();
        if (!isDisplayed) {
            return scrollParentToChild(this.locators.resultGridScrollContainer, locator);
        }
    }
}
