import { test, expect } from "@playwright/test";

test('One minute delay scenario', async ({ page }) => {

    await page.goto('file:///D:/SDET/B2B/Playwright_Practice/Files/delayedUi.html');
    await page.locator("//button[text()='Click Me']").click();
    const message = page.locator("//div[@id='message']");
    await expect(message).toBeVisible()
    const newMessage = '//p[@class="new-message"]';
    await page.waitForSelector(newMessage, {timeout: 62000});
    await expect(page.locator(newMessage)).toBeVisible()
    console.log(await page.locator(newMessage).textContent())
});