import { CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { useTranslations } from 'next-intl'

export const ResetLinkSentAlert = () => {
    const t = useTranslations()

    return <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>
            {t('Reset link sent')}
        </AlertTitle>
        <AlertDescription>
            {t('Reset link sent text')}
        </AlertDescription>
    </Alert>
}
