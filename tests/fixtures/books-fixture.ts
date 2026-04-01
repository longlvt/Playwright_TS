import { test as base } from '@playwright/test';
import BookPage from '../../pages/book-page';
import hooks from '../../utils/hooks';
import uiPages from '../../utils/uiPages';

type MyFixtures = {
    bookPage: BookPage;
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
});

export { expect } from '@playwright/test'
