import { test } from '../fixtures/books-fixture';
import { Page } from '@playwright/test';
import searchData from '../../data/search-data';

test.describe.configure({ mode: 'serial' });


test.describe('Search Books - Fixture', () => {
    // The scope of use is file or describe
    test.use({ isDup: false });
    test('Search with 1 result', async ({ page, bookSearch }) => {
        await bookSearch.fillSearchBox(searchData.oneResult)
        await checkSearchResult(page, 1)        
    });
    test('Search with many results', async ({ page, bookSearch }) => {
        await bookSearch.fillSearchBox(searchData.mulResult)
        await checkSearchResult(page, 2)        
    });
    test('Search with none result', async ({ page, bookSearch }) => {
        await bookSearch.fillSearchBox(searchData.noneResult)
        await checkSearchResult(page, 0)        
    });
});

async function checkSearchResult(page: Page, result: number) {
    const rows = page.locator('tr');
    result > 1 ? test.expect(await rows.count()).toBeGreaterThan(1) :
        await test.expect(page.locator('tr')).toHaveCount(result + 1)
};

/**
 * 1. import the fixture file instead of the @playwright/test
 * 2. as soon as you use "bookPage" as a param of the test, 
 *  the fixture will be called 
 * 3. In the fixture file, will create the POM
 * 4. Next step in the fixture is the function "use",
 *  so it goes back to the test file
 * 5. In the test file, it will execute all the commands,
 *  (cleanBooks and bookPage.goto)
 * 6. As the test ends, it goes back to the fixture
 *  and executes the first intruction after the "use"
 * 7. In the fixture file, executes "bookPage.addToYourCollection",
 *  passing the param definde in the describe 
 * (test.use({ isDupe: false });)
*/