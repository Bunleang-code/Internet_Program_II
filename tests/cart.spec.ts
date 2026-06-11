import { test, expect } from '@playwright/test';

// add to cart test
test('add product to cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /add to cart/i }).first().click();

  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});

//view cart test
test('view cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart.html/);
  await expect(page.getByText('Your Cart')).toBeVisible();
});

//remove from cart test
test('remove item from cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: /remove/i }).click();
  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});

// ===Challenge 2: Sort Products by Price Low to High ===
test('products sort by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  // Select "Price (low to high)"
  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  // Get all product prices
  const prices = await page.locator('.inventory_item_price')
    .allTextContents();

  // Convert "$7.99" -> 7.99
  const numericPrices = prices.map(price =>
    parseFloat(price.replace('$', ''))
  );

  // Verify first item is the lowest price
  expect(numericPrices[0]).toBe(Math.min(...numericPrices));
});