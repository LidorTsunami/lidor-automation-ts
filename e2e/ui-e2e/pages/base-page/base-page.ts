import { Browser, BrowserContext, chromium, Page } from '@playwright/test';

export class BasePage {
    protected page: Page;
    protected browser: Browser;
    protected context: BrowserContext;

    constructor(page: Page, browser: Browser, context: BrowserContext) {
        this.page = page;
        this.browser = browser;
        this.context = context;
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(selector: string) {
        await this.page.click(selector);
    }

    async fill(selector: string, value: string) {
        await this.page.fill(selector, value);
    }


    async isVisible(selector: string): Promise<boolean> {
        const element = this.page.locator(selector);
        return await element.isVisible();
    }

    async getText(selector: string): Promise<string> {
        const element = this.page.locator(selector);
        return (await element.textContent()) ?? '';
    }

    async close() {
        await this.browser.close();
    }
}
