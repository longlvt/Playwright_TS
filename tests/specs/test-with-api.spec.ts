import { test, expect } from '@playwright/test';
import ProfilePage from '../../pages/profile-page'
import bookListData from '../../data/mock-book-list-data';
import uiPages from '../../utils/uiPages';

let profilePage: ProfilePage
test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page)
    await page.goto(uiPages.profile)
})
test.describe('Test Mock with storage', () => {
    test.use({ storageState: '.auth/user.json'})
    test('Profile page displays mocked book data correctly', async ({ page }) => {
        await page.route(
            `**/Account/v1/User/${bookListData.userId}`,
            async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                userId: bookListData.userId,
                username: bookListData.username,
                books: bookListData.books,
                }),
            });
            }
        );
    
        // --- Step 1: Login via API to obtain token, bypassing UI ---
        // const profilePage = new ProfilePage(page)
        //   await page.goto('https://demoqa.com/login');
        //   if (await profilePage.logoutButton.isVisible()) {
        //         console.log("Already logged in, logout and login again to refresh the storage state file");
        //         await profilePage.logoutButton.click();
        //   }

        //   // Fill login credentials
        //   await page.fill('#userName', bookListData.username);
        //   await page.fill('#password', 'Firsttestonly1@');
        //   await page.click('#login');
        
        await profilePage.checkLoggedInUser(bookListData.username)


        // --- Step 3: Navigate to the profile page with session active ---
        // await page.reload();
        //   await page.waitForLoadState('networkidle');

        // --- Step 4: Assert book data matches mock ---
        for (const book of bookListData.books) {

            await expect(page.getByRole('link', { name: book.title })).toBeVisible();
            await expect(page.getByText(book.title)).toBeVisible()
            await expect(page.getByText(book.author)).toBeVisible()
            await expect(page.getByText(book.publisher)).toBeVisible()
        }

        // --- Step 5: Assert username is displayed ---
        await expect(page.locator('#userName-value')).toHaveText(bookListData.username);
        });
})
