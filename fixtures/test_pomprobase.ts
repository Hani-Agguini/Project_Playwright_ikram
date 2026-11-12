import{test as base,expect,Page} from "@playwright/test"

import { LoginPom } from "../Pages/LoginPom.page"

type Fixtures = {
    HomePage :Page,
    LoginPomValide :LoginPom,
    LoginPomInvalide :LoginPom

}
export const test =base.extend<Fixtures>({

    HomePage : async ({page},use)=>{
        await page.goto("https://www.saucedemo.com/")
        await use(page) 
    },
    LoginPomValide : async ({HomePage},use)=>{
        
        const lp =new LoginPom(HomePage)
        await lp.loginToApp("standard_user","secret_sauce")
        await use(lp)
        
    },
    LoginPomInvalide : async ({HomePage},use)=>{
        
        const lp =new LoginPom(HomePage)
        await lp.loginToApp("standard_userr","secret_sauce")
        await use(lp)
        
    }
})

export{expect}