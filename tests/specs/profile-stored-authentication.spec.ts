import { test } from '@playwright/test';
import ProfilePage from '../../pages/profile-page';
import uiPages from '../../utils/uiPages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(uiPages.profile);
    profilePage = new ProfilePage(page);
});

test.describe.only('Profile Page - Stored Authentication', () => {
    test ('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    })
});