import { test, expect } from "@playwright/test";

test('Redbubble test', async ({ page })=> {
    await page.goto('https://www.shoppersstack.com/');
  
    await page.locator('button[id="loginBtn"]').click();
  
    await page.locator('input[id="Email"]').fill('zxcvbn1@gmail.com');
    await page.locator('input[id="Password"]').fill('Qwerty@123');
    await page.locator("//span[text()='Login']").click();

    await page.locator("//span[text()='FOREVER21']").click();
    await page.locator("//span[text()='add to cart']").click();

    await page.locator('svg[id="cartIcon"]').click();
    
    await page.waitForTimeout(10000)
})