// live-app.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class LiveAppPage {
  readonly loginForm: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly pageTitle: Locator;
  readonly inventroyTab: Locator;
  readonly warningIcon: Locator;

  constructor(page: Page) {
    this.loginForm = page.locator('div.kn-login-form');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('input[value="Sign In"]');
    this.pageTitle = page.locator('h2.kn-title');
    this.inventroyTab = page.locator('li > a[data-kn-slug="#inventory2"]');
    this.warningIcon = page.locator('i.fa-warning');
  }

  async doAdminSignIn() {
    await expect(this.loginForm).toBeVisible();
    await this.emailInput.fill('admin@test.com');
    await this.passwordInput.fill('test');
    await this.signInButton.click();
    await expect(this.pageTitle).toHaveText('Warehouse Inventory');
    console.log('\tAdmin Logged In ...')
  }

  async validateColorWarningIcon(color: string) {
    await expect(this.warningIcon.first()).toBeVisible();
    const style = await this.warningIcon.first().getAttribute('style');
    console.log('\tStyle Attribute: ' + style);
    expect(style).toContain(color);
  }


}