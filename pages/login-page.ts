import { type Page, type Locator, expect } from '@playwright/test';
import messages from '../utils/messages';

class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly messagePanel: Locator;
    readonly password: Locator;
    readonly username: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.messagePanel = page.locator('#output');
        this.password = page.getByPlaceholder('Password');
        this.username = page.getByPlaceholder('UserName');
    }

    async fillUsername(username: string) {
        await this.username.fill(username);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }
    
    async doLogin(username: string, password: string) {
        console.log("Attempting to login with username:", username);
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    async checkLoggedIn() {
        await expect(this.page).toHaveURL(/.*profile/);
        await expect(this.page).toHaveTitle(/demosite/);
    }

    async checkInvalidCredentials() {
        await expect(this.messagePanel).toHaveText(messages.login.invalid);
    }
}

export default LoginPage;