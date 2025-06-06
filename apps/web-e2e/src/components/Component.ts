import { CurrentPage } from '../util/CurrentPage'
import { Page } from '@playwright/test'

export class Component {
    page: Page

    constructor () {
        this.page = CurrentPage.getInstance()
    }
}
