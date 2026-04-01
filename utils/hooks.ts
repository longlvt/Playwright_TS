import { Page } from '@playwright/test';
import { buildUrl } from './uiUrlBuilder';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import BookPage from '../pages/book-page';
import baseUrl from './envBaseUrl';
import uiPages from './uiPages';

const env = process.env.ENV!;

// Simplify the workflow and make it faster
async function beforeEach(
    page: Page,
    PageObjectParam: new (page: Page) => T,
    targetPage: keyof typeof uiPages,
    params?: Record<any, any>
): Promise<T> {
    console.log(`BASE URL: ${baseUrl[env].home}, TARGET PAGE: ${targetPage}`);
    console.log(`GO TO URL IN HOOKS: ${baseUrl[env].home+buildUrl(targetPage, params)}`);
    await page.goto(buildUrl(targetPage, params));
    const pageObject = new PageObjectParam(page);
    return pageObject;
    
}
export default { beforeEach }
