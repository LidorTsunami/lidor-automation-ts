import { Browser, BrowserContext, Page, chromium, test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page/login-page';

interface TestFixtures {
    browser: Browser;
    context: BrowserContext;
    page: Page;
    loginPage: LoginPage;
}

export const test = base.extend<TestFixtures>({
    browser: async ({}, use: any) => {
        const browser = await chromium.launch({ headless: false });
        await use(browser);
    },
    context: async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
    },
    page: async ({ context }, use) => {
        const page = await context.newPage();
        await use(page);
    },
    loginPage: async ({ page, browser, context }, use) => {
        const loginPage = new LoginPage(page, browser, context);
        await use(loginPage);
    },
});
