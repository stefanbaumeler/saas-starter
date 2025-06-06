import { InfoIcon } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@saas-starter/ui/Alert'
import { useTranslations } from 'next-intl'
import { Button } from '@saas-starter/ui/Button'
import { authClient } from '@/auth-client'
import { useUserContext } from '@/context/user'

export const EmailVerifyAlert = () => {
    const t = useTranslations()
    const {
        user
    } = useUserContext()

    const resend = async () => {
        if (user?.email) {
            const urlParts = new URL(window.location.href)

            urlParts.searchParams.append('verified', '1')

            await authClient.sendVerificationEmail({
                email: user.email,
                callbackURL: urlParts.toString()
            })
        }
    }

    return <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>
            {t('Please verify your email')}
        </AlertTitle>
        <AlertDescription className="w-full">
            <div className="flex justify-between items-center gap-4 w-full">
                {t('To complete your registration, please verify your email address')}
                <Button onClick={resend}>
                    {t('Resend verification email')}
                </Button>
            </div>
        </AlertDescription>
    </Alert>
}
