import { expect, test } from "@playwright/test";

test('Triggering Url in Browser', async ({page}) => {
    
    await page.goto('https://www.redbus.in/');
});

/**
 * @description 1.Click
 *              2.Fill
 *              3.Press
 *              4.title
 *              5.Locator
 *              6.getByText
 *              7.waitForSelector
 *              8.getByRole
 *              9.waitForFunction
 *              10.textContent
 *              11.allTextContents
 *              12.nth
 *              13.count
 *              14.isChecked
 *              15.goBack
 *              16.goForward
 *              17.getAttribute
 *              18.hover
 */
test('Basic Practice',async({page})=>{
    await page.goto('https://www.redbus.in/');
    const homePageTitle = await page.title();
    await expect(homePageTitle, "Home Page title is wrong").toEqual('Bus Ticket Booking Online made Easy, Secure with Top Bus Operators - redBus')
    await page.locator('[id="src"]').fill('Salem');
    await page.getByText('Salem New Bus Stand').click();
    const designation = await page.locator('[id="dest"]')
    await designation.fill('Bengaluru')
    await page.waitForTimeout(2000)
    await designation.clear()
    await page.waitForTimeout(2000)
    await designation.fill('Bengaluru')
    await page.waitForSelector("ul[class='sc-dnqmqq dZhbJF']")
    await designation.press('Enter') // Keyboard Action
    // await page.keyboard.press('Enter');  // Keyboard Action
    await page.locator("//span[text()='27']").click()
    await page.getByRole("button", { name : "SEARCH BUSES"}).click()

    // Wait for title
    await page.waitForFunction(()=>document.title === 'Search Bus Tickets',{timeout:10000}) 
    const searchTitle = await page.title()
    expect(searchTitle, "Search Page Title Wrong").toEqual('Search Bus Tickets')
    await page.locator("//span[text()='Ok, got it']").click()
    const text = await page.locator("//li[@id='rail_tickets_vertical']/child::span").textContent()
    expect(text).toBe("Train Tickets");
    const allBusName = await page.locator('//div[@class="clearfix row-one"]/descendant::div[contains(@class,"travels")]')
    
    console.log(await allBusName.allTextContents())
    console.log(typeof allBusName); // Object

    for (let i = 0; i <await allBusName.count(); i++) {
        const element = await allBusName.nth(i).textContent();
        if(element.includes('City Travels'))
            console.log(`Element Found ${element.toUpperCase()}`);
    }
    const checkbox = await page.locator('//label[@for="dtBefore 6 am" and @class="custom-checkbox"]')
    console.log(await checkbox.isChecked());
    expect(await checkbox.isChecked()).toBeFalsy()
    await checkbox.check()
    console.log(await checkbox.isChecked());
    expect(await checkbox.isChecked()).toBeTruthy()
    await page.waitForTimeout(1000)
    await checkbox.uncheck()
    await page.waitForTimeout(1000)
    await page.goBack()
    await page.goForward()
    let attribute = await page.locator("//div[@class='fixer']").getAttribute('id')
    expect(attribute).toStrictEqual('fixer');
    const hoverElement = await page.locator("//span[text()='Train Tickets']")
    await hoverElement.hover()
    await page.waitForTimeout(2000)
});

/**
 * @description 1. dragTo
 *              2. frameLocator
 */
test.only('DragAndDrop and Frmaes', async({page})=>{
    await page.goto('https://jqueryui.com/droppable/')
    // await page.waitForTimeout(3000)
    const frame = await page.frameLocator("//iframe[@class='demo-frame']")
    const source = await frame.locator("div[id='draggable']")
    const target = await frame.locator("div[id='droppable']")
    await source.dragTo(target)
    await page.waitForTimeout(3000)
    const text = await page.locator("//a[text()='Sortable']").textContent()
    console.log(`Outside Frame ${text}`);
    
})

/**
 * @description 1. Double click
 */
test('Double Click', async({page})=>{
    await page.goto('https://demoapps.qspiders.com/ui/button/buttonDouble?sublist=2')
    await page.locator("button[id='btn20']").dblclick()
    const verify = await page.locator("//button[@id='btn20']/following-sibling::span").textContent()
    console.log(verify);
})