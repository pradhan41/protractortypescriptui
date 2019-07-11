import { waitForThenClick, ElementFinder, Locator } from '@ge-apm-m/tziki/lib/protractor';
import { Logger } from '@ge-apm-m/tziki/lib/logger';

export class Common {
    private locators = {
        errorPopupMessage: by.xpath(
            '//div[@class="error-accumulator-container"]//span[@data-bind="text:errorMessage"]'
        ),
        errorPopupCloseIcon: by.xpath('//i[@class="icon-close-popup error-accumulator-container-close-mark"]'),
        closeTabIcon: (title: string) =>
            by.xpath(`//div[@class="route-tab"]//li[@title="${title}"]//i[@class="tab-close ds ds-cross"]`),
        okButton: by.xpath('//div[contains(@class, "okButtonClass")]'),
        dontSaveButton: by.xpath('//div[text() = "Don\'t Save"]'),
        selectByText: (fieldItemName: string) =>
            by.xpath(`//div[not(contains(@style,'display: none'))]/p[text()='${fieldItemName}']`)
    };

    async byText(target: ElementFinder | Locator, option: string): Promise<void> {
        await waitForThenClick(target);
        const optionEle = await element(this.locators.selectByText(option));
        return waitForThenClick(optionEle);
    }

    async closeErrorDialog(): Promise<void> {
        Logger.debug('Closing Error Dialog');
        return waitForThenClick(this.locators.errorPopupCloseIcon);
    }

    async closeTab(tabTitle: string): Promise<void> {
        Logger.debug('Closing Tab');
        return waitForThenClick(this.locators.closeTabIcon(tabTitle));
    }

    async closeTabWithoutSavingChanges(tabTitle: string): Promise<void> {
        await this.closeTab(tabTitle);
        Logger.debug('Clicking Do Not Save to Unsaved Changes warning');
        return waitForThenClick(this.locators.dontSaveButton);
    }

    async closeTabWithoutSavingChangesOk(tabTitle: string): Promise<void> {
        await this.closeTab(tabTitle);
        return this.confirmMessage();
    }

    async confirmMessage(): Promise<void> {
        Logger.debug('Clicking OK to message dialog');
        return waitForThenClick(this.locators.okButton);
    }

    async changeScreenSize(width: number, height: number): Promise<void> {
        return browser.driver
            .manage()
            .window()
            .setSize(width, height);
    }
}
