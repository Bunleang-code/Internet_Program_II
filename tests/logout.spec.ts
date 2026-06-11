import { test, expect } from '@playwright/test';

test('logout successfully', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /open menu/i }).click();

  await page.getByRole('link', { name: /logout/i }).click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});