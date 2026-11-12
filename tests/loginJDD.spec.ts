import { expect,test } from "@playwright/test";

import { LoginPom } from "../Pages/LoginPom.page";

import fs   from "fs" // fs (file system pour lire le fichier csv)

import {parse} from "csv-parse/sync"

import path from "path"

let lp : LoginPom

const users = parse(fs.readFileSync(path.join(__dirname,"data/JDD.csv")),{
    columns: true,
    skip_empty_lines: true,
    delimiter:',',


})

test("Login Pom valide",{tag:"@pom"},async({page})=>{

    lp = new LoginPom(page)

    for(const user of users){
        
        await page.goto("https://www.saucedemo.com/")
        await lp.loginToApp(user!.username,user!.password)

        if (user!.result === 'true'){
            await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
        }else{
            await expect(lp.getMessageError()).toBeVisible()
        }    
    }
})

