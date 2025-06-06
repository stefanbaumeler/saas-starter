'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { authClient } from '@/auth-client'
import { Button } from '@saas-starter/ui/Button'
import Link from 'next/link'
import { AuthMask } from '@/components/auth/AuthMask'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthPassword } from '@/components/auth/AuthPassword'
import { AuthProviders } from '@/components/auth/AuthProviders'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { redirect, useSearchParams } from 'next/navigation'
import { ResetCompleteAlert } from '@/components/auth/alerts/ResetCompleteAlert'

export const SignIn = () => {
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')
    const urlParams = useSearchParams()
    const reset = urlParams.get('reset')

    const signIn = async () => {
        const response = await authClient.signIn.email({
            email,
            password,
            callbackURL: '/dashboard'
        }, {
            onSuccess: async (context) => {
                if (context.data.twoFactorRedirect) {
                    redirect('/two-factor/verify')
                }
            }
        })

        if (response.error?.code) {
            // @ts-expect-error Type for variable unavailable
            setError(authTranslations(response.error.code))
        }
    }

    return <AuthMask>
        <AuthTitle text={t('Sign in')} />
        <AuthError error={error} />
        {reset ? <ResetCompleteAlert /> : null}
        <AuthInput
            id="email"
            value={email}
            type="email"
            label={t('Email')}
            placeholder={t('Enter email')}
            onChange={(event) => setEmail(event.target.value)}
        />
        <AuthPassword
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
        <Button
            onClick={signIn}
            className="w-full"
        >
            {t('Sign in')}
        </Button>
        <AuthDivider text={t('or')} />
        <AuthProviders />
        <AuthDivider />
        <div className="text-center text-sm w-full">
            {t('Don\'t have an account?')}
            {' '}
            <Link
                href="/signup"
                className="underline underline-offset-4"
            >
                {t('Sign up')}
            </Link>
        </div>
    </AuthMask>
}
