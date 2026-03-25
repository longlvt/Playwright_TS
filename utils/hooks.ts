import { Page } from '@playwright/test';
import { buildUrl } from './uiUrlBuilder';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import BookPage from '../pages/book-page';

// Simplify the workflow and make it faster
async function beforeEach(
    page: Page,
    PageObjectParam: new (page: Page) => LoginPage|BookPage|ProfilePage,
    targetPage: string,
    params?: Record<any, any>
) {
    await page.goto(buildUrl(targetPage, params));
    const pageObject = new PageObjectParam(page);
    return pageObject;
    
}
export default { beforeEach }
