// app-manager.page.ts
import { expect, Locator, Page } from '@playwright/test';

export class AppManagerPage {
  readonly appNavName: Locator;
  readonly navPages: Locator;
  readonly navRecords: Locator;
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
  readonly recordsWarehouseInventory: Locator;
  readonly recordsSearchInput: Locator;
  readonly recordsSearchButton: Locator;
  readonly addFilterButton: Locator;
  readonly filterModalTitle: Locator;
  readonly selectFilterOptions: Locator;
  readonly listFilterOperator: Locator;
  readonly listFilterValue: Locator;
  readonly saveFilterButton: Locator;
  readonly goToLiveApp: Locator;
  readonly newFilterTag: Locator;

  constructor(page: Page) {
    this.appNavName = page.locator('h1.appName');
    this.navPages = page.locator('a[data-cy="nav-pages"]');
    this.navRecords = page.locator('a[data-cy="nav-records"]'); 
    this.pagesAdminInventory = page.locator('div[data-cy="Admin > Inventory"]');
    this.inventory = page.locator('div[data-cy="Inventory"]');
    this.viewTitle = page.locator('h2[data-cy="view-title"]');
    this.tableView = page.locator('table.knTable');
    this.viewEditSettings = page.locator('div[content="Click to edit this view"]');
    this.tableColomnOnHand = page.locator('th[data-item="6"] > div.kn-item > div.overlay');
    this.toggleTitles = page.locator('span.toggle-title');
    this.toolboxTitles = page.locator('.toolbox-title > h2');
    this.colorInput = page.locator('div.kn-colorInput > input');
    this.saveChangeButton = page.locator('div[data-test="page-toolbox-save"] > a[data-cy="toolbox-save"]');
    this.recordsWarehouseInventory = page.locator('a[data-cy="Object Warehouse Inventory"]');
    this.recordsSearchInput = page.locator('div.recordsNav_search > input');
    this.recordsSearchButton = page.locator('div.recordsNav_search > button');
    this.addFilterButton = page.locator('a.kn-add-filter');
    this.filterModalTitle = page.locator('div[data-cy="modal-title"]');
    this.selectFilterOptions = page.locator('select.field-list-field');
    this.listFilterOperator = page.locator('select.field-list-operator');
    this.listFilterValue = page.locator('select[data-cy="dropdown-select"]');
    this.saveFilterButton = page.locator('button[data-cy="save-filters"]');
    this.goToLiveApp = page.locator('a.accessMenu_directLink');
    this.newFilterTag = page.locator('div#something_filters')
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

  async addNewFilter() {
    await this.addFilterButton.click();
    await expect(this.filterModalTitle).toBeVisible();
    await expect(this.selectFilterOptions).toBeVisible();
    await this.selectFilterOptions.selectOption( { label: 'Needs Re-Order'} );
    await expect(this.listFilterOperator).toHaveValue('is');
    await expect(this.listFilterValue).toHaveValue('true');
    await this.saveFilterButton.click();
    await expect(this.newFilterTag).toBeVisible();
    console.log('\tNew Filter Added...');
  }

}