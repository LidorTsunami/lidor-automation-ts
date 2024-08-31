import { BasePage } from '../base-page/base-page';
import {LoginPageSelectors, EnvVariables} from "./login-page-selectors";
import {Browser, BrowserContext, Page} from "@playwright/test";

export class LoginPage extends BasePage {
    private readonly baseUrl: string = EnvVariables.BASE_URL;
    private readonly username: string = EnvVariables.username
    private readonly password: string = EnvVariables.password
    private readonly hamburgerButton: string = EnvVariables.hamburger_button
    private readonly usernameInputSelector: string = LoginPageSelectors.USERNAME_INPUT;
    private readonly passwordInputSelector: string = LoginPageSelectors.PASSWORD_INPUT;
    private readonly loginButtonSelector: string = LoginPageSelectors.LOGIN_BUTTON;

    constructor(page: Page, browser: Browser, context: BrowserContext) {
        super(page, browser, context);
    }

    async openPage() {
        await this.navigateTo(this.baseUrl);
    }

    async enterUsername(username: string) {
        await this.fill(this.usernameInputSelector, username);
    }

    async enterPassword(password: string) {
        await this.fill(this.passwordInputSelector, password);
    }

    async submitLogin() {
        await this.click(this.loginButtonSelector);
    }

    async valid_login() {
        await this.openPage();
        await this.enterUsername(this.username);
        await this.enterPassword(this.password);
        await this.submitLogin();
    }

    async isHamburgerButtonVisible(): Promise<boolean> {
        return await this.page.locator(this.hamburgerButton).isVisible();
    }
}
