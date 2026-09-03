import { test } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const username = process.env.QA_USERNAME;
    const password = process.env.QA_PASSWORD;

    if (!username || !password) {
      throw new Error(
        'Missing login credentials. Set QA_USERNAME and QA_PASSWORD in the .env file.'
      );
    }

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Login with valid credentials', async () => {
      await loginPage.goto();
      await loginPage.login(username, password);
    });

    await test.step('Verify login is successful', async () => {
      await dashboardPage.verifySuccessfulLogin(username);
    });
  });
});
