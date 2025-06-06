import { useState } from 'react'
import { Button } from '@saas-starter/ui/Button'
import { useTranslations } from 'next-intl'
import { authClient } from '@/auth-client'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { redirect } from 'next/navigation'
import { AuthMask } from '@/components/auth/AuthMask'
import { AuthPassword } from '@/components/auth/AuthPassword'

export const DisableTwoFactor = () => {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')

    const disable = async () => {
        const response = await authClient.twoFactor.disable({
            password
        })

        if (response.error?.code) {
            // @ts-expect-error Type for variable unavailable
            setError(authTranslations(response.error.code))
        }
        else {
            redirect('/dashboard')
        }
    }

    return <AuthMask>
        <AuthTitle text={t('Disable two-factor authentication')} />
        <AuthError error={error} />
        <div className="flex justify-center w-full">
            <AuthPassword
                forgettable={false}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
        </div>
        <Button
            onClick={disable}
            className="w-full"
        >
            {t('Disable')}
        </Button>
    </AuthMask>
}
