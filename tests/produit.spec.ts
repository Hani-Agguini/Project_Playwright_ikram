import { expect,test } from "@playwright/test";

import { Inventory } from "../Pages/Inventory.page";

import { LoginPom } from "../Pages/LoginPom.page";

let lp : LoginPom

let inv : Inventory


test.beforeEach("setup",async ({page})=>{

    // Aller dans l url et me connecter 
    await page.goto("https://www.saucedemo.com/")
    lp = new LoginPom(page)
    inv = new Inventory(page)

    await lp.loginToApp("standard_user","secret_sauce")
})

test.afterEach("teardown",async({page})=>{

    await page.context().clearCookies()
    await page.evaluate(()=>localStorage.clear())

})


test("test E2E add product",async({page})=>{
    // verification qu on est dans la bonne page
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")

    // ajout du produit
    await inv.addCard()

    // verification du bouton remove
    expect(inv.visibiliteOfremove()).toBeTruthy()

    // verification du chiffre 1 dans le panier
    expect(await inv.getNbCard()).toBe("1")

    // cliquer sur le panier
    await inv.clickCard()

    // verification qu on est dans la bonne page
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")

})