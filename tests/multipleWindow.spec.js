import test, { expect } from "@playwright/test";

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

test('Window Switching', async ({ page }) => {
    await page.goto('https://demoapps.qspiders.com/ui/browser?sublist=0')
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator("a[id='browserLink1']").click()
    ])
    await newTab.locator("input[name='email']").fill('abc@gmail.com')
    await newTab.waitForTimeout(3000)
})

test('Tab Switching', async ({ page }) => {
    await page.goto('https://demoapps.qspiders.com/ui/browser/newTab?sublist=1')
    const [newTab] = await Promise.all([
        page.waitForEvent('popup'),
        page.locator("button[id='browserButton4']").click()
    ])
    await newTab.locator("input[name='email']").fill('abc@gmail.com')
    await newTab.waitForTimeout(3000)
})

test('Multiple Window Switching', async ({ context }) => {
    const page = await context.newPage()
    await page.goto('https://demoapps.qspiders.com/ui/browser/multipleWindow?sublist=2')
    await page.locator("button[id='browserButton3']").click()
    const pages = await context.pages()
    let signUpPage = null
    for (const element in pages) {
        // console.log(`${element} index --> ${pages[element].url()}`);
        if (pages[element].url().includes('SignUpPage')) {
            signUpPage = pages[element]
            console.log(`After finding signUpPage window url --> ${pages[element].url()}`);
        } else if (!pages[element].url().includes('sublist=2')) {
            pages[element].close()
        }
    }
    await signUpPage.bringToFront()
    await signUpPage.waitForLoadState('domcontentloaded')
    await signUpPage.locator('//input[@id="email"]').fill('abc@gmail.com')
    await signUpPage.locator('//input[@id="password"]').fill('abc123')
    await signUpPage.locator('//input[@id="confirm-password"]').fill("abc123")
    await signUpPage.locator("//button[text()='Sign Up']").click()
    await signUpPage.waitForTimeout(5000)
})


test.only('Multiple Tab Switching', async ({ context }) => {
    const page = await context.newPage()
    await page.goto('https://demoapps.qspiders.com/ui/browser/multipleTabs?sublist=3')
    await page.locator('button[id="browserButton2"]').click()
    const pages = await context.pages()
    let signUpPage = null
    for (const element in pages) {
        // console.log(`${element} index --> ${pages[element].url()}`);
        if (pages[element].url().includes('Login')) {
            signUpPage = pages[element]
            console.log(`After finding signUpPage window url --> ${pages[element].url()}`);
        } else if (!pages[element].url().includes('sublist=3')) {
            pages[element].close()
        }
    }
    await signUpPage.bringToFront()
    await signUpPage.waitForLoadState('domcontentloaded')
    const loginLabel = await signUpPage.locator('//form[@id="form"]/preceding-sibling::h2')
    const text = await signUpPage.textContent()
    expect(text).toStrictEqual('Login')
    // await signUpPage.locator('//input[@id="email"]').fill('abc@gmail.com')
    // await signUpPage.locator('//input[@id="password"]').fill('abc123')
    // await signUpPage.locator('//input[@id="confirm-password"]').fill("abc123")
    // await signUpPage.locator("//button[text()='Sign Up']").click()
    // await signUpPage.waitForTimeout(5000)
})

// test('Handling multiple tabs in 3 tabs)', async ({ context }) => {
//     const page = await context.newPage();
//     await page.goto('https://demoapps.qspiders.com/ui/browser/multipleTabs?sublist=3')
//     const pr = await Promise.all([
//         page.locator('button[id="browserButton2"]').click(),
//         (await context.waitForEvent('page')),
//         context.waitForEvent('page'),
//         context.waitForEvent('page'),
//         context.waitForEvent('page'),
//     ])
//     console.log(await pr);
//     let loginPage = undefined
//     const pages = await context.pages()
//     for (const index in pages) {
//         if (pages[index].url().includes('Login'))
//             loginPage = pages[index]
//         // else if (!pages[index].url().includes('sublist=3'))
//         //     await pages[index].close()
//     }
//     // await loginPage.bringToFront()
//     const loginLabel = await loginPage.locator('//form[@id="form"]/preceding-sibling::h2')
//     const text = await loginLabel.textContent()
//     expect(text).toStrictEqual('Login')
// })