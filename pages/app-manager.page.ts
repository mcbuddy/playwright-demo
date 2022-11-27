// app-manager.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class AppManagerPage {
  readonly appNavName: Locator;
  readonly navPages: Locator;
  readonly pagesAdminInventory: Locator;
  readonly inventory: Locator;
  readonly viewTitle: Locator;
  readonly tableView: Locator;
  readonly viewEditSettings: Locator;
  readonly tableColomnOnHand: Locator;
  readonly toggleTitles: Locator;
  readonly toolboxTitles: Locator;
  readonly colorInput: Locator;
  readonly saveChangeButton: Locator;
  readonly goToLiveApp: Locator;

  constructor(page: Page) {
    this.appNavName = page.locator('h1.appName');
    this.navPages = page.locator('a[data-cy="nav-pages"]'); // using cypress data helper since this one unique
    this.pagesAdminInventory = page.locator('div[data-cy="Admin > Inventory"]');
    this.inventory = page.locator('div[data-cy="Inventory"]');
    this.viewTitle = page.locator('h2[data-cy="view-title"]');
    this.tableView = page.locator('table.knTable')
    this.viewEditSettings = page.locator('div[content="Click to edit this view"]')
    this.tableColomnOnHand = page.locator('th[data-item="6"] > div.kn-item > div.overlay')
    this.toggleTitles = page.locator('span.toggle-title');
    this.toolboxTitles = page.locator('.toolbox-title > h2');
    this.colorInput = page.locator('div.kn-colorInput > input');
    this.saveChangeButton = page.locator('div[data-test="page-toolbox-save"] > a[data-cy="toolbox-save"]')
    this.goToLiveApp = page.locator('a.accessMenu_directLink')
  }

  async validateNavAppName(name: string) {
    await expect(this.appNavName).toBeVisible( { timeout: 9000 } );
    await expect(this.appNavName).toHaveText(name);
  }

  async validateViewTitleWithName(name: string) {
    const selectedView = this.viewTitle.filter( { hasText: name} )
    await expect(selectedView).toBeVisible();
    console.log('\tView Title"' + name + '" Loaded.')
  }

  async clickTableColomnName(name: string) {
    await expect(this.tableView).toBeVisible();
    await expect(this.tableColomnOnHand).toBeVisible();
    await this.viewEditSettings.hover();
    await expect(this.viewEditSettings).toBeVisible();
    await this.viewEditSettings.click();
    await expect(this.toolboxTitles).toBeVisible();
    await expect(this.toolboxTitles).toHaveText('Edit Table');
    await this.tableColomnOnHand.click();
    console.log('\tClick Colomn "'+ name +'"')
  }

  async validateToggleTitle(name: string) {
    const selectedToggleTitle = this.toggleTitles.filter( { hasText: name } )
    await expect(selectedToggleTitle).toBeVisible();
    console.log('\tValidate Toggle Title "' + name + '"');
  }

  async updateDisplayRuleColor(color: string) {
    await expect(this.colorInput).toBeVisible();
    
    await this.colorInput.fill(color);
    console.log('\tUpdate Display Rule with color:' + color);

    await expect(this.saveChangeButton).toBeVisible();
    await this.saveChangeButton.click();
    console.log('\tSaving Changes...');
    await expect(this.saveChangeButton).not.toBeVisible();
  }
}