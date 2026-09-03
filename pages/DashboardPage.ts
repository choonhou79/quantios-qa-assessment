import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly greeting: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.locator('#greeting');
    this.logoutButton = page.getByRole('button', { name: 'Logout', exact: true });
  }

  async verifySuccessfulLogin(username: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/dashboard\.html$/);
    await expect(this.greeting).toHaveText(`Hi ${username}!`);
    await expect(this.logoutButton).toBeVisible();
  }
}
