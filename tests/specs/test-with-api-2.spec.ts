import { test, expect } from '@playwright/test';
import ProfilePage from '../../pages/profile-page'
import bookListData from '../../data/mock-book-list-data';

test('Simple Mock', async ({ page }) => {
  // await page.goto('https://demo.playwright.dev/api-mocking/')
  // await page.waitForLoadState('networkidle');
  await page.route(
    `**/api/v1/fruits`,
    async (route) => {
      const json = [
        { name: "Test 1", id: 122 },
        { name: "Test 2", id: 123 },
        { name: "Test 3", id: 124 }
      ]
      await route.fulfill({ json });
    }
  );

  // await page.reload();
  await page.goto('https://demo.playwright.dev/api-mocking/')
  await page.waitForLoadState('networkidle');

  await expect(page.getByText('Test 1', { exact: true })).toBeVisible();

});