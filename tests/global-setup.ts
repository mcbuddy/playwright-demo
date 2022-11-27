// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.doLogin('budisugianto777@gmail.com', 'amZmoU39UkqhKKkA!QNTT4fm');

  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
}

export default globalSetup;