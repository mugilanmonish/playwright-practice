import { test, expect } from '@playwright/test';

test('JS Executor', async ({ page }) => {
    await page.goto('http://en.wikipedia.org/wiki/Salem%2C_Tamil_Nadu');
    
    await page.evaluate(() => window.scrollBy(0,5000) )
    await page.waitForTimeout(5000)
})

test.only('Js Executor - Fill text field without using fill()', async ({page}) => {
    await page.goto('https://demoapps.qspiders.com/ui?scenario=1')
    const nameField = await page.locator('input[id="name"]')
    await page.evaluate((el, value) => {
        el.value = value
    }, nameField, 'Mugilan')
    await page.waitForTimeout(5000)
})
