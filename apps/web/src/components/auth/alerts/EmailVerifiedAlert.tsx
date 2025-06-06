import { CheckCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { useTranslations } from 'next-intl'

export const EmailVerifiedAlert = () => {
    const t = useTranslations()

    return <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>
            {t('Email verified')}
        </AlertTitle>
        <AlertDescription>
            {t('You have successfully verified your email!')}
        </AlertDescription>
    </Alert>
}
