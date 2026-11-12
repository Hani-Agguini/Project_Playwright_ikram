import { expect,test } from "@playwright/test";

import { LoginPom } from "../Pages/LoginPom.page";

let lp : LoginPom

test.beforeEach("setUp",async({page})=>{

    await page.goto("https://www.saucedemo.com/")
    lp = new LoginPom(page)

})

test("Login Pom valide",{tag:"@pom"},async({page})=>{

    await lp.loginToApp("standard_user","secret_sauce")

    //await lp.setUsername("standard_user")
    //await lp.setPassword("secret_sauce")
    //await lp.clickButton()
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
})

test("Login Pom invalide",{tag:"@invalide"},async({page})=>{


    await lp.loginToApp("standard_userr","secret_sauce")
    
    const message= await lp.getErrorMessageText()
    const message_attendue="Epic sadface: Username and password do not match any user in this service"
    
    
    await expect(message).toBe(message_attendue)

    await expect(lp.visibiliteOfMessage()).toBeTruthy()

    await expect(lp.getMessageError()).toHaveText(message_attendue)
})

