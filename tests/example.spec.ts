import{test,expect} from '@playwright/test';

test("Mon premier test",async function({page}){
    await page.goto("https://www.saucedemo.com/")
})

test("Mon 2eme test",async ({page})=>{
    await page.goto("https://www.saucedemo.com/")
})