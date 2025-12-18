
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';
import { log } from 'node:console';

test('complete purchase flow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  
  console.log('Začínám test');
  await loginPage.goto();

  await page.screenshot({ path: 'screenshot.png' });
  
  console.log('Stránka načtena');
  await loginPage.checkPage();
  
  console.log('Stránka ověřena');
  await loginPage.login('standard_user', 'secret_sauce');

  

  await inventoryPage.addBackpackToCart();
  await inventoryPage.goToCart();

  await checkoutPage.startCheckout();
  await checkoutPage.fillShippingInfo('Karel', 'Marel', '223444');
  await checkoutPage.finishOrder();
  await checkoutPage.backToProducts();

  await loginPage.logout();
});