import { test, Page, expect, BrowserContext, chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page'
import { DashboardPage } from '../pages/dashboard.page'
import { AppManagerPage } from '../pages/app-manager.page'
import { LiveAppPage } from '../pages/live-app.page'
import { color } from 'pengrape';
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

test('Randomize the color for a Display Rule warning symbol icon.', async ({ page }) => {
  loginPage = new LoginPage(page);
  dashboardPage = new DashboardPage(page);
  appManagerPage = new AppManagerPage(page);

  await loginPage.doLogin(env.EMAIL, env.PASSWORD);
  await dashboardPage.validateLoggedIn();

  const appName = 'Warehouse Manager'
  await dashboardPage.validateAppLoaded(appName);
  await dashboardPage.clickAppWithName(appName);
  await appManagerPage.validateNavAppName(appName);
  
  await appManagerPage.navPages.click();
  await appManagerPage.pagesAdminInventory.click();
  await appManagerPage.inventory.click();
  await appManagerPage.validateViewTitleWithName('Warehouse Inventory');
  await appManagerPage.clickTableColomnName('On-Hand');
  await appManagerPage.validateToggleTitle('DISPLAY RULES');
  const randomColor = color({ format: 'hex' });
  await appManagerPage.updateDisplayRuleColor(randomColor);

  const [newPage] = await Promise.all([
    page.waitForEvent("popup"),
    console.log('\t=> Switching Tab'),
    await appManagerPage.goToLiveApp.click()
  ])
  await newPage.waitForLoadState();
  const liveAppPage = new LiveAppPage(newPage);
  await liveAppPage.doAdminSignIn();
  await liveAppPage.validateColorWarningIcon(randomColor);
});