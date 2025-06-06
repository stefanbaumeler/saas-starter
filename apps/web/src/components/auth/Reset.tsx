'use client'

import { AuthMask } from '@/components/auth/AuthMask'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button, buttonVariants } from '@saas-starter/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/auth-client'
import { AuthPassword } from '@/components/auth/AuthPassword'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { redirect } from 'next/navigation'

type Props = {
    token: string
}

export const Reset = ({
    token
}: Props) => {
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')

    const reset = async () => {
        const {
            error
        } = await authClient.resetPassword({
            newPassword,
            token
        })

        if (error?.code) {
            // @ts-expect-error Type for variable unavailable
            setError(authTranslations(error.code))
        } else {
            redirect('/signin?reset=1')
        }
    }

    return <AuthMask>
        <AuthTitle text={t('Reset password')} />
        <AuthError error={error} />
        <AuthPassword
            forgettable={false}
            id="email"
            value={newPassword}
            label={t('New password')}
            placeholder={t('Enter new password')}
            onChange={(event) => setNewPassword(event.target.value)}
        />
        <Button onClick={reset}>
            {t('Reset')}
        </Button>
        <Link
            href="/apps/web/src/app/(auth)/signin/signin"
            className={buttonVariants({
                variant: 'link'
            })}
        >
            <ArrowLeft />
            {t('Back')}
        </Link>
    </AuthMask>
}
