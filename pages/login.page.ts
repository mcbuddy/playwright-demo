// login.page.ts
import { expect, Locator, Page } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly rememberMeCheckBox: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signInButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.rememberMeCheckBox = page.locator('.remember', { hasText: ' Remember me ' });
        this.forgotPasswordLink = page.locator('#forgot-pass', { hasText: 'Forgot your Password?'});
        this.signInButton = page.locator('input[value="Sign In"]');
    }

    async goto() {
        await this.page.goto('https://builder.knack.com/')
    }

    async doLogin(email: string, password: string) {
        console.log('\tLogin before Test...')
        await this.goto();
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.signInButton.click();
    }
}