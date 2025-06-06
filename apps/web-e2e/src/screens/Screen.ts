import { expect, Locator, Page } from '@playwright/test'
import { CurrentPage } from '../util/CurrentPage'

export class Screen {
    root: Locator
    page: Page

    constructor (public name: string) {
        this.page = CurrentPage.getInstance()
        this.root = this.page.getByTestId(`${this.name}`)
    }

    async visit () {
        // TODO
    }

    async hasLeftScreen () {
        await expect.soft(this.root).toBeHidden()
    }

    async matchesScreenshot ({
        locator = (loc) => loc, name, maxDiffPixelRatio
    }: { locator?: (loc: Locator) => Locator
        name?: string | string[]
        maxDiffPixelRatio?: number }) {
        const loc = locator(this.root)

        if (Array.isArray(name)) {
            const filename = `${name.pop()}.png`

            await expect.soft(loc.last()).toHaveScreenshot([...name, filename], {
                maxDiffPixelRatio
            })
        } else {
            await expect.soft(loc.last()).toHaveScreenshot(`${name ?? 'screenshot'}.png`, {
                maxDiffPixelRatio
            })
        }
    }
}
