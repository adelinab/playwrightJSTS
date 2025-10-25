const {test, expect} = require('@playwright/test');

test('Browser context playwright test',async ({browser})=>
{
    
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

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
   console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    

    const allTitles = await cardTitles.allTextContents();
    console.log("allTitles: "+allTitles);


});


test('Page playwright test',async ({page})=>
{  
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('UI Controls', async({page}) =>
{
    const userName = page.locator("#username");
    const btnSignIn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
   
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("[type='password']").fill("learning");
    await userName.fill("rahulshettyacademy");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log("aquí: "+await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();

    await page.locator("#terms").uncheck();
    expect( await page.locator("#terms").isChecked()).toBeFalsy();

    await expect(documentLink).toHaveAttribute("class","blinkingText");  
   // await btnSignIn.click();
   // await page.pause();
}
);


test.only('Child Windows', async ({browser}) => 
    {

        const context = await browser.newContext();
        const page = await context.newPage();
        

        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");

        
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            documentLink.click(),
        ]) 

        const text = await newPage.locator(".red").textContent();
        const arrayText = text.split("@");
        const domain = arrayText[1].split(" ")[0];
        //console.log(domain);

        const userName = page.locator("#username");
        await userName.fill(domain);
        console.log(await page.locator("#username").inputValue());
    });