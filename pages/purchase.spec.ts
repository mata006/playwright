import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';

test('complete purchase flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();

  await checkoutPage.startCheckout();
  await checkoutPage.fillShippingInfo('Karel', 'Marel', '223444');
  await checkoutPage.finishOrder();
  await checkoutPage.backToProducts();

  await loginPage.logout();
});