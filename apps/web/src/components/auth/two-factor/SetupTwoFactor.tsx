'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { AuthMask } from '@/components/auth/AuthMask'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { SetupTwoFactorStep1, SetupTwoFactorStep1ContinueArgs } from '@/components/auth/two-factor/SetupTwoFactorStep1'
import { SetupTwoFactorStep2 } from '@/components/auth/two-factor/SetupTwoFactorStep2'
import { SetupTwoFactorStep3 } from '@/components/auth/two-factor/SetupTwoFactorStep3'

type Props = {
    initialPassword?: string
}

export const SetupTwoFactor = ({
    initialPassword
}: Props) => {
    const [error, setError] = useState('')
    const [totpLink, setTotpLink] = useState('')
    const [hasValidTotp, setHasValidTotp] = useState(false)
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')

    const onStep1Complete = (res: SetupTwoFactorStep1ContinueArgs) => {
        setError('')
        setTotpLink(res.totpLink)
        setBackupCodes(res.backupCodes)
    }

    const onStep2Complete = () => {
        setHasValidTotp(true)
    }

    const onError = (code?: string) => {
        // @ts-expect-error Type for variable unavailable
        setError(authTranslations(code))
    }

    return <AuthMask>
        <h1 className="text-3xl font-bold">
            {t('Setup Two-Factor Authentication')}
        </h1>
        <AuthError error={error} />
        <SetupTwoFactorStep1
            initialPassword={initialPassword}
            onError={onError}
            onContinue={onStep1Complete}
        />
        <SetupTwoFactorStep2
            onError={onError}
            onContinue={onStep2Complete}
            totpLink={totpLink}
        />
        <SetupTwoFactorStep3
            show={hasValidTotp}
            backupCodes={backupCodes}
        />
    </AuthMask>
}
