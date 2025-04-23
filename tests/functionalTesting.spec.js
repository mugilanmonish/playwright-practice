import { expect, test } from "@playwright/test";

const formFields = [
    {
        name: 'Username',
        locator: 'input[id="username"]',
        errorLocator: 'div[id="usernameError"]',
        testData: [
            { input: 'Johna', isValid: true }, // BVA +
            { input: 'DivyaSpand', isValid: true }, // BVA +
            { input: 'John', isValid: false }, // BVA -
            { input: 'Johnson Jack', isValid: false }, // BVA -
            { input: 'John123', isValid: false },
            { input: ' John', isValid: false },
            { input: 'John ', isValid: false },
            { input: '@#345tfd', isValid: false },
            { input: '     ', isValid: false },
        ]
    },
    {
        name: 'Password',
        locator: 'input[id="password"]',
        errorLocator: 'div[id="passwordError"]',
        testData: [
            { input: 'Deoraj@1', isValid: true }, // BVA +
            { input: 'deorajesHybv@1', isValid: true }, // BVA +
            { input: 'deora@1', isValid: false }, // BVA -
            { input: 'deorajesHybvu@1', isValid: false }, // BVA -
            { input: 'deoraj@1', isValid: false },
            { input: 'DEORAJ@1', isValid: false },
            { input: '@1@2@3$5^88', isValid: false },
            { input: '        ', isValid: false },
            { input: 'Deorajesh', isValid: false },
            { input: ' Deoraj@1', isValid: false },
            { input: 'Deoraj@1 ', isValid: false },
        ]
    }
]

test.describe('Functional Testing', () => {
    let context;
    let page;

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        await page.goto('file:///D:/SDET/B2B/Playwright_Practice/Files/formValidation.html');
    });

    // test.afterAll(async () => {
    //     await context.close();
    // });

    for (const field of formFields) {
        test.describe(`${field.name} validation`, () => {
            for (const { input, isValid } of field.testData) {
                test(`Input "${input}" should be ${isValid ? 'valid' : 'invalid'} for ${field.name}`, async () => {
                    const inputField = page.locator(field.locator);
                    const errorMessage = page.locator(field.errorLocator);

                    await inputField.fill(input);

                    // click submit button to trigger validation
                    const submitButton = page.locator("//button[text()='Submit']");
                    await submitButton.click();

                    // validate the error message based on the input
                    if (isValid) await expect(errorMessage).toBeHidden();
                    else await expect(errorMessage).toBeVisible();
                });
            }
        });
    }
});