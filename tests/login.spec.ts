import{test,expect} from '@playwright/test';

test.beforeEach("setup",async ({page})=>{
    // Aller dans l url
    await page.goto("https://www.saucedemo.com/")
})

test.afterEach("teardown",async({page})=>{

    await page.context().clearCookies()
    await page.evaluate(()=>localStorage.clear())

})

test("login valide",{tag:['@smoke','@tnr']},async ({page})=>{
    
    // Saisir le user name 
    await page.locator("#user-name").fill("standard_user")
    // Saisir le password
    await page.locator("#password").fill("secret_sauce")
    // Cliquer sur le bouton login
    await page.locator("#login-button").click()
    // redirection vers la page d'acceuil
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

})

test("login invalide with acessibility locator",{tag:"@acess"},async ({page})=>{


    // Saisir le user name 
    await page.getByRole("textbox",{name:"Username"}).fill("invalide")
    
    // Saisir le password
    await page.getByRole("textbox",{name:"Password"}).fill("invalide")
    
    // Cliquer sur le bouton login
    await page.getByRole("button",{name:"Login"}).click()
    
    // on cherche si on a un message d erreur 
    await expect(page.getByRole("alert")).toBeVisible()


    // Chercher un message specifique 
    //await expect(page.locator("data-test=error")).toHaveText("Epic sadface: Username and password do not match any user in this service")

})

