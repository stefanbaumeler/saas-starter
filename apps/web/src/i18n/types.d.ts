import { formats } from '@/i18n/request'
import messages from '../../messages/en.json'

declare module 'next-intl' {
    interface AppConfig {
        Messages: typeof messages
        Formats: typeof formats
    }
}
