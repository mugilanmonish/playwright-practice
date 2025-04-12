import { expect, test } from "@playwright/test";
import path from "path";
import { readFile } from 'fs/promises';
import pdfParse from "pdf-parse";

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


test('Single File upload Popup', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/fileUpload?sublist=0')
    const filePath = 'Files\\dummy.pdf'
    const chooseFileBtn = page.locator("//input[@id='fileInput']")
    await chooseFileBtn.setInputFiles(filePath)
    const fileName = await page.locator("//p[@class='me-2']").textContent()
    expect(fileName, 'dummy.pdf')
})

test('Multiple File upload Popup', async ({ page }) => {

    await page.goto('https://demoapps.qspiders.com/ui/fileUpload/multiple?sublist=3')
    const filePath1 = 'Files\\dummy.pdf'
    const filePath2 = 'Files\\dummy-1.pdf'
    const chooseFileBtn = page.locator("//input[@id='fileInput']")
    await chooseFileBtn.setInputFiles([filePath1, filePath2])
    const fileNames = await page.locator("//li[@class='flex']").allTextContents()
    expect(fileNames, ['dummy.pdf ', 'dummy-1.pdf '])
})

test('File Download Popup', async ({ page }) => {
    await page.goto('https://demoapps.qspiders.com/ui/download?sublist=0')
    await page.locator("//textarea[@name='textarea']").fill('Hi , this is Mugi')

    const [download] = await Promise.all([
        page.waitForEvent('download'), // wait for download to trigger
        page.locator("//button[@id='downloadButton']").click(),    // or whatever triggers the download
    ]);

    const filePath = path.join(__dirname, 'downloads', await download.suggestedFilename());
    console.log(__dirname)
    await download.saveAs(filePath);

    const fileContent = await readFile(filePath, 'utf-8');

    // Assert on content
    console.log(fileContent);
    
    expect(fileContent).toContain('Mugi');
})

test.only('File Download Popup and validating pdf content', async ({ page }) => {
    await page.goto('https://examplefile.com/document/pdf/10-mb-pdf')

    const [download] = await Promise.all([
        page.waitForEvent('download'), // wait for download to trigger
        page.locator("//a[@title='10 MB PDF Download']").click(),    // or whatever triggers the download
    ]);

    const filePath = path.join(__dirname, 'downloads', await download.suggestedFilename());
    await download.path();
    await download.saveAs(filePath);

    const fileBuffer = await readFile(filePath);

    const pdfData = await pdfParse(fileBuffer);
    
    expect(pdfData.text).toContain('10 MB PDF');
})