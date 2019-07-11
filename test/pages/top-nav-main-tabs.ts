import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';

export class TopNavMainTabs {
    private locators = {
        topNavMainTabs: by.css('.top-nav-main-tabs-group li'),
        tabNumberN: (tabNumber: number) =>
            by.xpath(`//*[contains(@class, 'top-nav-main-tabs-group')]//li[position()=${tabNumber}]`),
        lastTab: by.xpath("//*[@class='top-nav-main-tabs-group']//ul//li[last()]")
    };

    waitForTabN(tabNumber: number): Promise<void> {
        Logger.info(`Waiting for tab application tab number ${tabNumber}`);
        const tab = element(this.locators.tabNumberN(tabNumber));
        return waitUntilVisible(tab);
    }

    async getTabCount(): Promise<number> {
        Logger.info('Asking for application tab count');
        const tabs = await element.all(this.locators.topNavMainTabs);
        const tabCount = tabs.length;
        Logger.debug(`Current tab count: ${tabCount}`);
        return tabCount;
    }
}
