import { Page } from '@playwright/test'

let instance: Page

export class CurrentPage {
    static setInstance (page: Page) {
        instance = page
    }
    static getInstance () {
        return instance
    }
}
