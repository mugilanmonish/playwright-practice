import { test } from "@playwright/test";

test('Notification Popup to allow', async ({ page }) => {
    await page.goto('file:///D:/SDET%20FullStack/B2B/Playwright_Practice/Html_files/Notification_Popup_Advanced.html')
    const permissionStatus = await page.locator("//p[@id='permissionStatus']").textContent()
    console.log(`PS ${permissionStatus}`);
    await page.waitForTimeout(5000)
})

test('Notification Popup with Mic access', async ({ context, page }) => {
    await context.grantPermissions(['microphone'], { origin: 'https://mictests.com/' });
    await page.goto('https://mictests.com/')
    await page.waitForTimeout(5000)
})

/**
 * @description 1.dialog.message
 *              2.dialog.accept
 */
test('Javascript Alert Popup Accept', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')

    // Handling Js popup Accept
    page.on('dialog', async dialog => {
        console.log(await dialog.message()); // Log the confirm message
        await dialog.accept(); // Accept the dialog (click "OK")
    })
    // triggering popup
    await page.locator('//button[@id="confirmButton"]').click()
    console.log(`Confirmation Message : ${await page.locator("//span[@id='confirmResult']").textContent()}`);
})

/**
 * @description 1.dialog.dismiss
 */
test('Javascript Popup Dismiss', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')

    // Handling Js popup Dismiss
    page.on('dialog', async dialog => {
        console.log(await dialog.message()); // Log the dialog message
        await dialog.dismiss(); // Dismiss the dialog (click "Cancel")
    });
    await page.locator('//button[@id="confirmButton"]').click()
    console.log(`Dissmiss Message : ${await page.locator("//span[@id='confirmResult']").textContent()}`);
})


test('Javascript Popup Prompt', async ({ page }) => {
    await page.goto('https://demoqa.com/alerts')

    // Handling Js popup Dismiss
    page.on('dialog', async dialog => {
        console.log(await dialog.message()); // Log the dialog message
        await dialog.accept('Mugi!'); // Dismiss the dialog (click "Cancel")
    });
    await page.locator('//button[@id="promtButton"]').click()
    console.log(`Promp Text : ${await page.locator("//span[@id='promptResult']").textContent()}`);
})