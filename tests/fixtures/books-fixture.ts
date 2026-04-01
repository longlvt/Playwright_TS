import { test as base } from '@playwright/test';
import BookPage from '../../pages/book-page';
import hooks from '../../utils/hooks';

type MyFixtures = {
    bookPage: BookPage;
    bookSearch: BookPage;
}

export type Duplicate = {
    isDup: boolean;
}

export const test = base.extend<MyFixtures & Duplicate>({
    isDup: false,

    bookPage: async ({ page, isDup }, use) => {
        const bookPage = await hooks.beforeEach(page, BookPage, 'bookStore');

        await use(bookPage);

        await bookPage.addToYourCollection(isDup);
    },

    bookSearch: async ({ page }, use) => {
        const searchPage = await hooks.beforeEach(page, BookPage, 'bookStore')
        await use(searchPage)
    }
});

export { expect } from '@playwright/test'
