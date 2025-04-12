const { test, expect } = require('@playwright/test');
const testData = require('./testData/data.json');

test('Data driven using Json File', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await page.locator('button[aria-label="Search (Ctrl+K)"]').click()
  await page.locator('input[class="DocSearch-Input"]').fill(testData.search)
  await page.waitForSelector('(//ul[@id="docsearch-list"])[1]')
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000)
  expect(await page.title()).toEqual("Annotations | Playwright")
});

test('Data driven using Excel', async({page}) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  await page.locator('button[aria-label="Search (Ctrl+K)"]').click()
  await page.locator('input[class="DocSearch-Input"]').fill()
  await page.waitForSelector('(//ul[@id="docsearch-list"])[1]')
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000)
  expect(await page.title()).toEqual("Annotations | Playwright")
})