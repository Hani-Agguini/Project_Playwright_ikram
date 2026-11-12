import { Page } from "@playwright/test"

export class Inventory {

    readonly page: Page;

    constructor(p: Page) {

        this.page = p;
    }

    // définir les locators de la page login 

    elements = {
        addCard: () => this.page.locator('#add-to-cart-sauce-labs-backpack'),
        remove: () => this.page.locator("#remove-sauce-labs-backpack"),
        nbCard: () => this.page.locator("[data-test='shopping-cart-badge']"),
        buttonCard: () => this.page.locator("[data-test='shopping-cart-link']"),
    }

    async addCard() {

        await this.elements.addCard().click()

    }
    async visibiliteOfremove() {

        await this.elements.remove().isVisible()

    }

    async getNbCard(): Promise<string | null> {

        return await this.elements.nbCard().textContent()
    }

    async clickCard() {

        await this.elements.buttonCard().click()

    }
}