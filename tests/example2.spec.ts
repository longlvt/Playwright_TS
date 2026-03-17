import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    // await page.getByRole('link', { name: 'Get started'}).click();
    homePage.clickGetStarted();
}

test.describe('Playwright Home Page', () => {
    test('has title', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await homePage.assertPageTitle();
    });

    test('get started link', async ({ page }) => {
        // Click the get started link.
        await clickGetStarted(page);

        // Expects the URL to contain intro.
        await expect(page).toHaveURL(/.*intro/);
    });

    test('check Home page', async ({page}) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);

            await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

            await page.getByRole('button', { name: 'Node.js'}).hover();
            await page.getByRole('link', { name: 'Java', exact: true }).click();
        })

        await test.step('Assert', async () => {
            await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
            await expect(page.getByText('Installing Playwright', { exact: true})).not.toBeVisible();

            const textToCheck = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
            await expect(page.getByText(textToCheck, { exact: true })).toBeVisible();
        })
    });
});