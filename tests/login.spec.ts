import { test } from '@playwright/test';
import LoginPage from '../pages/login-page';
import uiPages from '../utils/uiPages';

import userData from '../data/user-data';

const userName = process.env.USERNAME || userData.invalidUsername;
const password = process.env.PASSWORD || userData.invalidPassword;
let loginPage: LoginPage;

// Use this to clear the storage state, and don't load the sign-in state
test.use({ storageState: {cookies: [], origins: []} });

test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
    await page.goto(uiPages.login);
    loginPage = new LoginPage(page);
});

test.describe('Book Store - Login', () => {
    test('Successful login', async ({ }) => {
        await loginPage.doLogin(userName, password);
        await loginPage.checkLoggedIn();
    });

    test('Failed login - Invalid username', async ({ }) => {
        const invalidUserName = userData.invalidUsername;
        await loginPage.doLogin(invalidUserName, password);
        await loginPage.checkInvalidCredentials();
    });

    test('Failed login - Invalid password', async ({ }) => {
        const invalidPassword = userData.invalidPassword;
        await loginPage.doLogin(userName, invalidPassword);
        await loginPage.checkInvalidCredentials();
    });
});