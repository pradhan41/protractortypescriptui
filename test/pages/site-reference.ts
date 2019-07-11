import { Logger } from '@ge-apm-m/tziki/lib/logger';
import { waitUntilVisible } from '@ge-apm-m/tziki/lib/protractor';

export class SiteReference {
    private locators = {
        queryOverviewHeader: by.xpath('//*[@id="shell-screen"]/section/section/div/div[@class=\'query-landing-page\']'),
        title: by.xpath(
            "//*[contains(@class, 'site-screen')]//mi-panel//*[contains(@class, 'title')]//span[text()='Sites']"
        )
    };

    isReady(): Promise<boolean> {
        Logger.info('Asking if the Site Reference module is ready');
        const title = element(this.locators.title);
        return title.isDisplayed();
    }

    waitUntilReady(): Promise<void> {
        Logger.info('Waiting until the Site Reference module is ready');
        return waitUntilVisible(this.locators.title);
    }
}
