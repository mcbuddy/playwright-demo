import { test, Page, expect, BrowserContext, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dashboard.page'
import { AppManagerPage } from '../pages/app-manager.page'
import { LiveAppPage } from '../pages/live-app.page'
import { env } from 'process';

let page: Page;
let context: BrowserContext;
let loginPage: LoginPage;
let dashboardPage: DashboardPage;
let appManagerPage: AppManagerPage;
let liveAppPage: LiveAppPage;

test.beforeEach(async ({ browser }) => {
  browser = await chromium.launch({
    headless: false
  });
  context = await browser.newContext()
  page = await context.newPage();
});

test.afterAll(async () => {
  page.close();
});

test('Validate records matches the number of records equal with Records Tab', async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  appManagerPage = new AppManagerPage(page);

  await loginPage.doLogin(env.TEST_EMAIL, env.TEST_PASSWORD);
  await dashboardPage.validateLoggedIn();

  const appName = 'Warehouse Manager'
  await dashboardPage.validateAppLoaded(appName);
  await dashboardPage.clickAppWithName(appName);
  await appManagerPage.validateNavAppName(appName);

  await appManagerPage.navRecords.click();
  await appManagerPage.recordsWarehouseInventory.click();
  
  await Promise.all([
    page.waitForLoadState("networkidle"),
    await appManagerPage.addNewFilter()
  ]);

  const recordRows = await page.$$('tr[data-cy="record-row"]');
  console.log('\tFound ' + recordRows.length + ' records');

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    console.log('\t=> Switching Tab'),
    await appManagerPage.goToLiveApp.click()
  ])
  await newPage.waitForLoadState();
  const liveAppPage = new LiveAppPage(newPage);
  await liveAppPage.doAdminSignIn();
  await liveAppPage.inventroyTab.click();
  
  await Promise.all([
    newPage.waitForLoadState("networkidle"),
    await liveAppPage.addFilter()
  ]);
  const liveAppRecordRows = await newPage.$$('table.kn-table > tbody > tr');
  console.log('\tFound ' + (liveAppRecordRows.length - 1) + ' records');
  expect(recordRows.length).toEqual(liveAppRecordRows.length - 1);
});