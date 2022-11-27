// dashboard.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly UserSetting: Locator;
  readonly navbarTitle: Locator;
  readonly appList: Locator;
  readonly appTitle: Locator;

  constructor(page: Page) {
    this.UserSetting = page.locator('#global-user-settings');
    this.navbarTitle = page.locator('#knack-title');
    this.appList = page.locator('#app-list');
    this.appTitle = page.locator('div.app-title > a');
  }

  async validateLoggedIn() {
    await expect(this.UserSetting).toBeVisible();
    await expect(this.navbarTitle).toHaveText('Knack Builder');
    console.log('\tLogin Succesfully!')
  }

  async validateAppLoaded(name: string) {
    await expect(this.appList).toBeVisible();
    await expect(this.appTitle).toHaveText(name);
    console.log('\tApp with name: "' + name + '" Found!')
  }

  async clickAppWithName(name: string) {
    const selectedApp = this.appTitle.filter( { hasText: name } )
    await selectedApp.click();
    console.log('\tGo to App "' + name + '" Manager')
  }
}