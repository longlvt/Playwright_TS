import { test } from '../fixtures/books-fixture';
import { APIRequestContext, Page, expect } from '@playwright/test';
import baseAPIUrl from '../../utils/envBaseUrl';
import addBooksCollections from '../api/requests/add-books-collections';
import userData from '../../data/user-data';
import { cleanBooks } from './book-with-fixture-and-api.spec'; 

let apiContext: APIRequestContext;
const env = process.env.ENV;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

test.beforeAll(async ({ playwright }) => {
    // apiContext = await playwright.request.newContext({ storageState: 'storageState.json' });
    apiContext = await playwright.request.newContext({
        baseURL: baseAPIUrl[env].api,
        extraHTTPHeaders: {
            Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
            Accept: 'application/json',
        },
    });
});

test.describe.only('Profile - Add list of books to collection', () => {
    test('Sort Books', async ({ page }) => {
        const bookList = userData.books.ISBNs
        await addListOfBooks(bookList)
        await getBooksUser(userId, page, 2)

        await cleanBooks(userId)
        await getBooksUser(userId, page, 0)
    })
})

async function addListOfBooks(bookList: string[]) {
    await addBooksCollections.addListBookToCollection(apiContext, userId, bookList)
}

async function getBooksUser(userId: string, page: Page, count: number) {
    const booksObj = await addBooksCollections.getAllBooksForUser(apiContext, userId)
    console.log(booksObj.books.length)
    expect(booksObj.books.length).toEqual(count)
}