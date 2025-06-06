import { CookieResolver, I18nModule, QueryResolver } from 'nestjs-i18n'
import path from 'path'
import * as de from './messages/de/mail.json'
import * as en from './messages/en/mail.json'
export { de, en }

export const I18nConfig = I18nModule.forRoot({
    fallbackLanguage: 'en',
    loaderOptions: {
        path: path.resolve(__dirname, './messages'),
        watch: true
    },
    typesOutputPath: path.resolve(__dirname, './types/generated/i18n.ts'),
    resolvers: [
        {
            use: QueryResolver,
            options: ['lang']
        },
        CookieResolver
    ]
})
