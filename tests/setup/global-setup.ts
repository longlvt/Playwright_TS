import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../../pages/login-page';
import uiPages from '../../utils/uiPages';

async function globalSetup(config: FullConfig) {
  const user = process.env.USERNAME || "test_name";
  const password = process.env.PASSWORD || "aaa";
  const { baseURL, storageState } = config.projects[0].use;
  console.log('Global setup - logging in with user:', baseURL);
  console.log('Save storage state to:', storageState);
  const browser = await chromium.launch({ headless: true, timeout: 10000 });
  const context = await browser.newContext();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });
    console.log("Login page:", baseURL+uiPages.login);
    await page.goto(baseURL+uiPages.login);

    console.log("Logging in with user:", user);
    await loginPage.doLogin(user, password);

    console.log("Checking if logged in successfully");
    await loginPage.checkLoggedIn();
    await page.context().storageState({ path: storageState as string });
    await browser.close();
  } catch (err) {
      await context.tracing.stop({
        path: './test-results/failed-setup-trace.zip'
      });
      await browser.close();
      throw err;
  }
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer