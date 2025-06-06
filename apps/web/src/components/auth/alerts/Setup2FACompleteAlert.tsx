import { CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { useTranslations } from 'next-intl'

export const Setup2FACompleteAlert = () => {
    const t = useTranslations()

    return <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>
            {t('Two-Factor Authentication Setup sucessful')}
        </AlertTitle>
        <AlertDescription>
            {t('You have successfully set up two-factor authentication.')}
        </AlertDescription>
    </Alert>
}
