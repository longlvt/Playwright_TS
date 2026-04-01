import { test, type Page, expect } from '@playwright/test'
import ProfilePage from '../../pages/profile-page'
import apiPaths from '../../utils/apiPaths'
import uiPages from '../../utils/uiPages';
import bookListData from '../../data/mock-book-list-data';

let profilePage: ProfilePage

test.beforeEach(async ({ page }) => {
    profilePage = new ProfilePage(page)
    await page.goto(uiPages.profile)
})

test.describe.only('Profile - API Interception', () => {
    test.use({ storageState: '.auth/user.json' });
    test('Sort Books', async ({ page, context }) => {
        await apiCallAndMock(page)

        for (const book of bookListData.books) {
            await expect(page.getByRole('link', { name: book.title })).toBeVisible();
            await expect(page.getByText(book.title)).toBeVisible()
            await expect(page.getByText(book.author)).toBeVisible()
            await expect(page.getByText(book.publisher)).toBeVisible()
        }
    })
})

async function apiCallAndMock(page: Page) {
    await profilePage.mockBooksListResponse(page)
    const [resp] = await Promise.all([
        page.waitForResponse(new RegExp(apiPaths.account)),
        await page.reload()
    ])
    await resp.json()
}