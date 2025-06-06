import { expect, Locator, Page } from '@playwright/test'
import { CurrentPage } from '../../util/CurrentPage'

export class Dialog {
    page: Page
    root: Locator

    constructor (name: string) {
        this.page = CurrentPage.getInstance()
        this.root = this.page.getByTestId(name)
    }

    async closeWithClickOutside () {
        // TODO

        await this.shouldBeClosed()
    }

    async closeWithEsc () {
        await this.root.press('Escape')

        await this.shouldBeClosed()
    }

    async closeWithCancel () {
        // TODO

        await this.shouldBeClosed()
    }

    async close () {
        // TODO

        await this.shouldBeClosed()
    }

    async shouldBeVisible () {
        await expect(this.root).toBeVisible()
    }

    async shouldBeClosed () {
        await expect(this.root).not.toBeVisible({
            timeout: 30000
        })
    }
}
