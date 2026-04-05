import { APIRequestContext } from '@playwright/test';
import { buildUrl } from '../../../utils/apiUrlBuilder';
import { executeRequest } from '../../../utils/apiRequestUtils';
import endpoints from '../../../utils/apiEndpoints';
import methods from '../../../utils/apiMethods';

async function addBookToCollection(apiContext: APIRequestContext, userId: string, isbn: string) {
  const method = methods.post;
  const requestOptions = { data: { userId: userId, collectionOfIsbns: [ {isbn: isbn} ] }};
  const requestUrl = buildUrl(endpoints.books.post, userId, isbn);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

async function addListBookToCollection(apiContext: APIRequestContext, userId: string, isbn: string[]) {
  const method = methods.post;
  const bookList = isbn.map((str) => {
    return { isbn: String(str) }
  })
  const requestOptions = { data: { userId: userId, collectionOfIsbns: bookList }};
  const requestUrl = buildUrl(endpoints.books.post, userId, isbn);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
}

async function getAllBooksForUser(apiContext: APIRequestContext, userId: string) {
  const method = methods.get;
  const requestOptions = {};
  const requestUrl = buildUrl(endpoints.account.get, userId);
  const response = await executeRequest(apiContext, requestUrl, method, requestOptions);
  return await response.json()
}

export default { addBookToCollection, addListBookToCollection, getAllBooksForUser };