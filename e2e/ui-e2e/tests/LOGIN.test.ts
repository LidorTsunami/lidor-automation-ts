import { test } from '../fixtures/test-fixtures';
import {expect} from "playwright/test";

test.describe('Login Page Tests', () => {
    test('should login successfully', async ({ loginPage }) => {
        await loginPage.valid_login();
        expect(await loginPage.isHamburgerButtonVisible())
    });
});
