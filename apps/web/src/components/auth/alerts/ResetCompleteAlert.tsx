import { CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { useTranslations } from 'next-intl'

export const ResetCompleteAlert = () => {
    const t = useTranslations()

    return <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>
            {t('Password reset')}
        </AlertTitle>
        <AlertDescription>
            {t('Password reset text')}
        </AlertDescription>
    </Alert>
}
