import { test as base } from '@playwright/test';
import BookPage from '../../pages/book-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';

type MyFixtures = {
    bookPage: BookPage;
}

export type Duplicate = {
    isDup: boolean;
}

export const test = base.extend<MyFixtures & Duplicate>({
    isDup: false,

    bookPage: async ({ page, isDup }, use) => {
        const bookPage = await hooks.beforeEach(page, BookPage, pages.booksStorePage) as BookPage;

        await use(bookPage);

        await bookPage.addToYourCollection(isDup);
    },
});

export { expect } from '@playwright/test'
