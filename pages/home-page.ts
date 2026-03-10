import { type Locator, type Page, expect } from '@playwright/test';

export class HomePage {
    
    readonly page: Page;
    readonly getStartedBtn: Locator;
    readonly title: RegExp;


    constructor(page: Page) {
        this.page = page;
        this.getStartedBtn = page.getByRole('link', { name: 'Get started'});
        this.title = /Playwright/;
    }

    async clickGetStarted() {
        await this.getStartedBtn.click();
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.title);
    }
}

export default HomePage;