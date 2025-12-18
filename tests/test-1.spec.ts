import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.seznam.cz/');
  await page.getByRole('textbox', { name: 'Vyhledat' }).click();
  await page.getByRole('textbox', { name: 'Vyhledat' }).fill('Paly');
  await page.getByRole('textbox', { name: 'Vyhledat' }).click();
  await page.getByRole('textbox', { name: 'Vyhledat' }).click();
  await page.getByRole('textbox', { name: 'Vyhledat' }).fill('Playwright');
  await page.getByLabel('hlavička').getByRole('button').filter({ hasText: /^$/ }).click();
  await page.getByRole('link', { name: 'Playwright - Wikipedia' }).click();
  await expect(page).toHaveTitle(/Playwright/);

  await expect(page.getByRole('heading', { name: 'Playwright', level: 1 })).toBeVisible();

  await expect(page.locator('#Etymology')).toBeVisible();

  await expect(page.getByRole('heading', { name: 'Etymology' })).toBeVisible();

});