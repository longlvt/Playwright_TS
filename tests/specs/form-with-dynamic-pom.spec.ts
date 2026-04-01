import { test } from '@playwright/test';
import ApplicationForm from '../../pages/application-form';
import hooks from '../../utils/hooks';

let appForm: ApplicationForm;

test.beforeEach(async ({ page }) => {
    appForm = await hooks.beforeEach(page, ApplicationForm, 'form');
})

test.describe('Profile - Dynamic Page Object Model', () => {
    test('Check logged in', async () => {
        const userName = process.env.USERNAME!;
        await appForm.fillFirstName(userName);
    })
})