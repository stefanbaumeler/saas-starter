import { AuthOTP } from '@/components/auth/AuthOTP'
import { useState } from 'react'
import { Button } from '@saas-starter/ui/Button'
import { useTranslations } from 'next-intl'
import { authClient } from '@/auth-client'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { redirect } from 'next/navigation'
import { AuthMask } from '@/components/auth/AuthMask'
import { AuthInput } from '@/components/auth/AuthInput'

enum ValidationMethod {
    totp = 'totp',
    backupCode = 'backupCode'
}

export const VerifyTwoFactor = () => {
    const [totp, setTotp] = useState('')
    const [backupCode, setBackupCode] = useState('')
    const [error, setError] = useState('')
    const [method, setMethod] = useState<ValidationMethod>(ValidationMethod.totp)
    const t = useTranslations()

    const verify = async () => {
        let response

        if (method === ValidationMethod.totp) {
            response = await authClient.twoFactor.verifyTotp({
                code: totp
            })
        }

        if (method === ValidationMethod.backupCode) {
            response = await authClient.twoFactor.verifyBackupCode({
                code: backupCode
            })
        }

        if (response?.error?.code) {
            // @ts-expect-error Type for variable unavailable
            setError(authTranslations(response.error.code))
        }
        else {
            redirect('/dashboard')
        }
    }

    return <AuthMask>
        <AuthTitle text={t('Verify your two-factor authentication')} />
        <AuthError error={error} />
        {method === ValidationMethod.totp ? <div className="flex justify-center w-full">
            <AuthOTP
                value={totp}
                onChange={setTotp}
            />
        </div> : null}
        {method === ValidationMethod.backupCode ? <AuthInput
            label={t('Recovery code')}
            placeholder={t('Enter recovery code')}
            id="backup-code"
            value={backupCode}
            onChange={(event) => setBackupCode(event.target.value)}
        /> : null}
        <Button
            onClick={verify}
            className="w-full"
        >
            {t('Verify')}
        </Button>
        {method === ValidationMethod.totp ? <div className="text-center text-sm w-full">
            {t('Having problems?')}
            {' '}
            <Button
                variant="link"
                onClick={() => setMethod(ValidationMethod.backupCode)}
                className="underline underline-offset-4"
            >
                {t('Use a recovery code')}
            </Button>
        </div> : null}
        {method === ValidationMethod.backupCode ? <Button
            variant="ghost"
            onClick={() => setMethod(ValidationMethod.totp)}
        >
            {t('Back')}
        </Button> : null}
    </AuthMask>
}
