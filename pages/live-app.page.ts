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
  readonly addFilterButton: Locator;
  readonly addFilterModal: Locator;
  readonly filterOptions: Locator;
  readonly listFilterOperator: Locator;
  readonly listFilterValue: Locator;
  readonly saveFilterButton: Locator;
  readonly tagFilter: Locator;

  constructor(page: Page) {
    this.loginForm = page.locator('div.kn-login-form');
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('input[value="Sign In"]');
    this.pageTitle = page.locator('h2.kn-title');
    this.inventroyTab = page.locator('#app-menu-list > li > a[data-kn-slug="#inventory2"]');
    this.warningIcon = page.locator('i.fa-warning');
    this.addFilterButton = page.locator('a.kn-add-filter');
    this.addFilterModal = page.locator('div.kn-modal');
    this.filterOptions = page.locator('select.field.select');
    this.listFilterOperator = page.locator('select.operator.kn-select');
    this.listFilterValue = page.locator('span.kn-filter-value > select');
    this.tagFilter = page.locator('li.kn-tag-filter');
    this.saveFilterButton = page.locator('input#kn-submit-filters');
  }

  async doAdminSignIn() {
    await expect(this.loginForm).toBeVisible();
    await this.emailInput.fill('admin@test.com');
    await this.passwordInput.fill('test');
    await this.signInButton.click();
    // await expect(this.pageTitle).toHaveText('Warehouse Inventory');
    console.log('\tAdmin Logged In ...')
  }

  async validateColorWarningIcon(color: string) {
    await expect(this.warningIcon.first()).toBeVisible();
    const style = await this.warningIcon.first().getAttribute('style');
    console.log('\tStyle Attribute: ' + style);
    expect(style).toContain(color);
  }

  async addFilter() {
    await expect(this.addFilterButton).toBeVisible();
    this.addFilterButton.click();
    await expect(this.addFilterModal).toBeVisible();
    await this.filterOptions.selectOption( { label: 'Needs Re-Order' } );
    await expect(this.listFilterOperator).toHaveValue('is');
    await expect(this.listFilterValue).toHaveValue('Yes');
    await this.saveFilterButton.click();
    await expect(this.tagFilter).toHaveText('Needs Re-Order is Yes');
    console.log('\tLive App New Filter Added...');
  }
}