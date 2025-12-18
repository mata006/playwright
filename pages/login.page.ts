import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly logo: Locator;
  readonly loginContainer: Locator;
  readonly credentialsInfo: Locator;
  readonly passwordInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.logo = page.locator('.login_logo');
    this.loginContainer = page.locator('[data-test="login-container"]');
    this.credentialsInfo = page.locator('[data-test="login-credentials"]');
    this.passwordInfo = page.locator('[data-test="login-password"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async checkPage(): Promise<void> {
    // Titulek stránky
    await expect(this.page).toHaveTitle('Swag Labs');

    // Logo
    await expect(this.logo).toHaveText('Swag Labs');

    // Login container
    await expect(this.loginContainer).toBeVisible();

    // Username input
    await expect(this.usernameInput).toBeVisible();
    await expect(this.usernameInput).toHaveAttribute('placeholder', 'Username');

    // Password input
    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(this.passwordInput).toHaveAttribute('type', 'password');

    // Login button
    await expect(this.loginButton).toBeVisible();
    await expect(this.loginButton).toHaveValue('Login');

    // Credentials info
    await expect(this.credentialsInfo).toContainText('standard_user');
    await expect(this.passwordInfo).toContainText('secret_sauce');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout(): Promise<void> {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.locator('[data-test="logout-sidebar-link"]').click();
  }
}