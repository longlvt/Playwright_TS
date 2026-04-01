import { type Page, type Locator , expect, type BrowserContext } from '@playwright/test';
import bookListData from '../data/mock-book-list-data';
import apiPaths from '../utils/apiPaths';

class SearchPage {
  readonly page: Page;
  readonly booksCollectionRequestRegExp: RegExp;
  readonly userNameLable: Locator;
  readonly gridRow1: Locator;
  readonly gridRow2: Locator;
  readonly notLoggedInLabel: Locator;
  readonly searchField: Locator;
  readonly titleHeaderLabel: Locator;
  readonly logoutButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.booksCollectionRequestRegExp = new RegExp(apiPaths.account);
    this.userNameLable = page.getByText('User Name :', { exact: true });
    this.userNameLable = page.locator('#userName-value');
    this.gridRow1 = page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
    this.gridRow2 = page.locator('div:nth-child(2) > .rt-tr > div:nth-child(2)');
    this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    this.searchField = page.getByPlaceholder('Type to search');
    this.titleHeaderLabel = page.getByText('Title');
    this.logoutButton = page.getByRole('button', { name: 'Log out' });
  }

  async fillSearchField(q: string) {
    await this.searchField.fill(q);
  }

  async checkSearchResult(q: string, items: string) {
  }

  async checkBooksList() {
    for (const book of bookListData.books){
      await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
    }
  }

  async sortBooksList() {
    await this.titleHeaderLabel.click({ clickCount: 2 });
  }

  async checkLoggedIn() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    // await expect(this.notLoggedInLabel).toBeVisible();
  }

  async checkLoggedInUser(userName: string) {
    await expect(this.userNameLable).toBeVisible();
    await expect(this.page.locator(`#userName-value`)).toHaveText(userName);
  }

  // async checkLoggedInAdmin() {
  //   await expect(this.notLoggedInLabel).not.toBeVisible();
  //   await expect(this.bookAdminLabel).toBeVisible();
  // }

//   async checkSort() {
//     await expect(this.gridRow1).toContainText(bookListData.books[1].title);
//     await expect(this.gridRow2).toContainText(bookListData.books[0].title);
//   }

  async getBooksList() {
  }

  async mockBooksListResponse(page: Page) {
    const userId = process.env.USERID!
    const accountEndpoint = this.booksCollectionRequestRegExp + userId
    console.log("ABOUT TO MOCK THIS:", accountEndpoint)
    await page.route(accountEndpoint, (route) => route.fulfill({
      status: 200,
      body: JSON.stringify({...(bookListData)})
    }));
  }
}

export default SearchPage;
