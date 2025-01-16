import test from "@playwright/test";

/**
 * @description 1. bringToFront
 */
test('Handling multiple tabs', async ({ page }) => {
    // Navigate to Flipkart
    await page.goto('https://www.flipkart.com/');

    // Search for iPhone
    await page.getByPlaceholder('Search for Products, Brands and More').fill('iphone 16 pro max');
    await page.keyboard.press('Enter');
    await page.waitForSelector("//div[text()='Apple iPhone 16 Pro Max (Natural Titanium, 256 GB)']");

    // Click the product and handle the new tab
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'), // Wait for the new tab to open
        page.locator("//div[text()='Apple iPhone 16 Pro Max (Natural Titanium, 256 GB)']").click(),
    ]);

    // Wait for the new tab to load
    await newTab.waitForLoadState();
    // Perform actions in the new tab
    // await newTab.pause()
    const mobileName = "//h1[@class='_6EBuvT']/span"
    await newTab.waitForSelector(mobileName)
    console.log(`First Tab title ${await page.title()}`);
    var label = await newTab.locator(mobileName).textContent()
    console.log(`Mobile Label: ${label}`);

    // Close the new tab
    // await newTab.close();

    // await page.waitForTimeout(3000)
    // Switch back to the first tab
    await page.bringToFront();
    await page.waitForTimeout(3000)
    await newTab.bringToFront()
    await newTab.waitForTimeout(3000)
    await newTab.close()
    await page.bringToFront();
    await page.waitForTimeout(3000)
    console.log(`First Tab title ${await page.title()}`);
});

test('Multiple Window', async({page})=>{
    await page.goto('https://demoapps.qspiders.com/ui/browser?sublist=0')
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator("a[id='browserLink1']").click()
    ])
    const emailTxtFld = await newTab.locator("input[name='email']").fill('abc@gmail.com')
    await newTab.waitForTimeout(3000)
    
})