import { test } from '@playwright/test';
import ProfilePage from '../../pages/profile-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    profilePage = await hooks.beforeEach(page, ProfilePage, pages.profilePage) as ProfilePage;
})

test.describe('Profile - Dynamic Page Object Model', () => {
    test('Check logged in', async () => {
        const userName = process.env.USERNAME!;
        await profilePage.checkLoggedInUser(userName);
    })
})