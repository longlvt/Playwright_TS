import { test } from '@playwright/test';
import ProfilePage from '../../pages/profile-page';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    await page.goto(pages.profilePage);
    profilePage = new ProfilePage(page);
});

test.describe('Profile Page - Stored Authentication', () => {
    test ('Check logged in', async () => {
        await profilePage.checkLoggedIn();
    })
});