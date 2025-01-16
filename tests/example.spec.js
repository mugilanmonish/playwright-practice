// @ts-check
const { test, expect } = require('@playwright/test');
// const { constants } = require('os');


test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  
  // await page.waitForTimeout(50000)
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.only('get started link', async ({ page , browserName }) => {
  test.slow(browserName === 'chromium', "It will take extra time")
  await page.goto('https://playwright.dev/');
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

