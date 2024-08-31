import { test } from '../fixtures/test-fixtures';
import {expect} from "playwright/test";// Adjust the import path as needed

test.describe('Login Page Tests', () => {
    test('should login successfully', async ({ loginPage }) => {
        await loginPage.valid_login();
        expect(await loginPage.isHamburgerButtonVisible())
    });
});
