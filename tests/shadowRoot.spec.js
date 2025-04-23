import { test } from "@playwright/test";

test('Shop app shadow root handling by inbuilt playwright getByLabel method', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org/')
    const shopEle = await page.getByLabel('SHOP Home').textContent()
    console.log(`TEXT ${shopEle}`);
})

test('Shop app shadow root handling by css selector', async ({ page }) => {
    await page.goto('https://shop.polymer-project.org')
    const shopEle = await page.locator("a[aria-label='SHOP Home']").textContent()
    console.log(shopEle)
})

test('Demo qspiders app shadow root - Normal open shadow root', async({page}) =>{
    await page.goto('https://demoapps.qspiders.com/ui/shadow?sublist=0')
    await page.locator(`input[placeholder="Enter your username"]`).fill('abc@gmail.com')
    await page.locator(`input[placeholder="Enter your password"]`).fill('abc@123')
    await page.locator(`button[type="submit"]`).click()
})

test('Demo qspiders app shadow root - Closed shadow root', async ({page}) =>{
    await page.goto('https://demoapps.qspiders.com/ui/shadow/closed?sublist=1')
    const loginLabel = await page.locator("//h1[text()='Login']")
    
    // Get element location and size
    const box = await loginLabel.boundingBox()
    console.log('Element position:', {
        x: box.x,
        y: box.y
    })
    console.log('Element size:', {
        width: box.width,
        height: box.height
    })

    // Click at the center of the element using coordinates
    await page.mouse.click(
        box.x + (box.width / 2),  // center x coordinate
        (box.y + (box.height / 2))+64  // center y coordinate
    )
    await page.keyboard.type('mugilan');
    await page.waitForTimeout(5000) 
})