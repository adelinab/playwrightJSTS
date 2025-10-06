const {test, expect} = require('@playwright/test');

test.only('Browser context playwright test',async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await btnSignIn.click();

    const errorText = await page.locator("[style*='block']").textContent();
    
    expect(errorText).toContain('Incorrect');

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await btnSignIn.click();
    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());
});


test('Page playwright test',async ({page})=>
{  
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});