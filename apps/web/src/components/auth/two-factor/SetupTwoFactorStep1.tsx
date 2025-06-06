import { AuthPassword } from '@/components/auth/AuthPassword'
import { Button } from '@saas-starter/ui/Button'
import { useTranslations } from 'next-intl'
import { authClient } from '@/auth-client'
import { useEffect, useState } from 'react'

export type SetupTwoFactorStep1ContinueArgs = {
    totpLink: string
    backupCodes: string[]
}

type Props = {
    initialPassword?: string
    onError: (errorCode?: string) => void
    onContinue: (args: SetupTwoFactorStep1ContinueArgs) => void
}

export const SetupTwoFactorStep1 = ({
    initialPassword,
    onError,
    onContinue
}: Props) => {
    const [error, setError] = useState('')
    const [verified, setVerified] = useState(false)
    const [password, setPassword] = useState(initialPassword ?? '')
    const t = useTranslations()

    const enableTwoFactorAuthentication = async () => {
        const response = await authClient.twoFactor.enable({
            password
        })

        if (response.error) {
            onError(response.error.code)
            setError(response.error.code || '')
        }
        else {
            setError('')
            setVerified(true)
            onContinue({
                totpLink: response.data.totpURI,
                backupCodes: response.data.backupCodes
            })
        }
    }

    useEffect(() => {
        if (password) {
            enableTwoFactorAuthentication()
        }
    }, [])

    return initialPassword && error || !initialPassword && !verified ? <>
        {t('To get started, we have to verify it\'s you')}
        <AuthPassword
            forgettable={false}
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={enableTwoFactorAuthentication}>
            {t('Continue')}
        </Button>
    </> : null
}
