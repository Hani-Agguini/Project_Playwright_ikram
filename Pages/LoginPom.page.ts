import { Page } from "@playwright/test"

export class LoginPom {

    readonly page: Page;

    constructor(p: Page) {

        this.page = p;
    }

    // définir les locators de la page login 

    elements = {
        username: () => this.page.locator("#user-name"),
        password: () => this.page.locator("#password"),
        loginButton: () => this.page.locator("#login-button"),
        messageError: () => this.page.locator("[data-test='error']")
    }

    // definir les methodes associés aux allocators

    async setUsername(u: string) {

        await this.elements.username().fill(u)

    }

    async setPassword(p: string) {

        await this.elements.password().fill(p)

    }

    async clickButton() {

        await this.elements.loginButton().click()

    }

    async getErrorMessageText(): Promise<string | null> {

        return await this.elements.messageError().textContent()
    }

    getMessageError() {

        return this.elements.messageError()

    }

    async visibiliteOfMessage() {

        await this.elements.messageError().isVisible()

    }

    async loginToApp(u: string, p: string){
        await this.setUsername(u)
        await this.setPassword(p)
        await this.clickButton()
    }
}