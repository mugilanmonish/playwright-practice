import { expect, test } from "@playwright/test";

/**
 * @description 1.selectOption
 *              2.inputValue
 */
test('Handling dropdown', async({page})=>{
    await page.goto('https://demoapps.qspiders.com/ui/dropdown?sublist=0')
    await page.locator("//select[@id='select3']").selectOption('India')
    await page.waitForTimeout(2000)
    await page.locator('//select[@id="select5"]').selectOption({label:"Tamil Nadu"})
    await page.waitForTimeout(2000)
    const countryDropdown = await page.locator("//select[@id='select3']")
    expect(await countryDropdown.inputValue()).toEqual('India')

    const phoneNummberTxtFld = await page.locator('[id="phone"]')
    phoneNummberTxtFld.fill('7708084971')
    await page.waitForTimeout(2000)
    expect(await phoneNummberTxtFld.inputValue()).toBe('7708084971')
})