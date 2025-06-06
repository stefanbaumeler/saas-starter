import { QRCodeSVG } from 'qrcode.react'
import { AuthOTP } from '@/components/auth/AuthOTP'
import { Button } from '@saas-starter/ui/Button'
import { authClient } from '@/auth-client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

type Props = {
    onError: (errorCode?: string) => void
    onContinue: () => void
    totpLink?: string
}

export const SetupTwoFactorStep2 = ({
    onError,
    onContinue,
    totpLink
}: Props) => {
    const t = useTranslations()
    const [totp, setTotp] = useState('')
    const [verified, setVerified] = useState(false)

    const verifyTotp = async () => {
        const response = await authClient.twoFactor.verifyTotp({
            code: totp
        })

        if (response.error) {
            onError(response.error.code)
        }
        else {
            onContinue()
            setVerified(true)
        }
    }

    return totpLink && !verified ? <>
        <div>
            {t('Scan this QR code with your two-factor authentication app on your phone.')}
        </div>
        <QRCodeSVG
            value={totpLink}
        />
        <div>
            {t('Enter the six-digit code from the application.')}
        </div>
        <AuthOTP
            value={totp}
            onChange={setTotp}
        />
        <Button onClick={verifyTotp}>
            {t('Continue')}
        </Button>
    </> : null
}
