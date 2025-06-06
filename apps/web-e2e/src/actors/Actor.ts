import { BrowserContext, Page, test } from '@playwright/test'
import { CurrentPage } from '../util/CurrentPage'

export class Actor {
    page: Page
    context: BrowserContext
    username: string
    password: string
    testId = `${test.info().titlePath.join('/')}-${test.info().testId}_${test.info().retry}`

    constructor ({
        page, context, username, password
    }: {
        page: Page
        context: BrowserContext
        username?: string
        password?: string
    }) {
        this.page = page

        CurrentPage.setInstance(page)

        this.context = context

        this.username = username ?? crypto.randomUUID().substring(0, 30)
        this.password = password ?? `${this.username}password`
    }
}
