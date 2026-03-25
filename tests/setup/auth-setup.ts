import { test as setup, type Page, chromium } from '@playwright/test';
import LoginPage from '../../pages/login-page';
import SearchPage from '../../pages/profile-page';
import uiPages from '../../utils/uiPages';
import { log } from 'node:console';


const userFile = '.auth/user.json';

setup.beforeEach("New Browser context", async ({ page }) => {
    
    console.log("Launch new context browser")
    // Launch browser
    const browser = await chromium.launch();
    
    // Create a completely new, anonymous context
    const context = await browser.newContext();

    // Clear all cookies in the current context
    await context.clearCookies();
    
    // Create a page within that context
    page = await context.newPage();
    
    // Clear local storage
    // await page.evaluate(() => window.localStorage.clear());

    // // Clear session storage
    // await page.evaluate(() => window.sessionStorage.clear());

})

setup('Setup authentication for user role', async ({ page }) => {
    const user = process.env.USERNAME || 'testuser';
    const password = process.env.PASSWORD || 'testpassword';
    const baseURL = setup.info().project.use.baseURL;
    const profilePage = new SearchPage(page);

    await page.goto(baseURL + uiPages.login);

    // TODO: Work-around for "Already logged in" scenario. Need to find a better way to handle this.
    if (await profilePage.logoutButton.isVisible()) {
        console.log("Already logged in, logout and login again to refresh the storage state file");
        await profilePage.logoutButton.click();
        await doLogin(page, user, password);
        await page.context().storageState({ path: userFile });
    } else {
        await doLogin(page, user, password);
        await page.context().storageState({ path: userFile });
    }
    
});

async function doLogin(page: Page, username: string, password: string) {

    console.log("DO LOGIN IN AUTH-SETUP");    
    const loginPage = new LoginPage(page);
    await loginPage.doLogin(username, password);
    await loginPage.checkLoggedIn();
}   