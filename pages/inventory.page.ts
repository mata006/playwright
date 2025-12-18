import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async addBackpackToCart(): Promise<void> {
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }
}