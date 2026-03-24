import { test, chromium } from '@playwright/test';
import ProfilePage from '../../pages/profile-page';
import uiPages from '../../utils/uiPages';

let profilePage: ProfilePage;

// test.use({ storageState: '.auth/user.json' });

test.beforeEach(async ({ page }) => {
    await page.goto(uiPages.profile);
});

test.describe('Book Store Application - Profile', () => {
    test.use({ storageState: '.auth/user.json' });
    test('Sort books - user', async ( { page } ) => { 
        profilePage = new ProfilePage(page);
        const user = process.env.USERNAME || 'testuser';
        await profilePage.checkLoggedInUser(user);
    });
});