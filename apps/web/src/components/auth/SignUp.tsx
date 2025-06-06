import { AuthMask } from '@/components/auth/AuthMask'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { authClient } from '@/auth-client'
import { Button } from '@saas-starter/ui/Button'
import { AuthPassword } from '@/components/auth/AuthPassword'
import { AuthInput } from '@/components/auth/AuthInput'
import { AuthDivider } from '@/components/auth/AuthDivider'
import { AuthProviders } from '@/components/auth/AuthProviders'
import Link from 'next/link'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { redirect } from 'next/navigation'

export const SignUp = () => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')

    const signUp = async () => {
        const response = await authClient.signUp.email({
            name,
            email,
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
        <AuthTitle text={t('Sign up')} />
        <AuthError error={error} />
        <AuthInput
            id="name"
            label={t('Name')}
            type="text"
            placeholder={t('Enter name')}
            value={name}
            onChange={(event) => setName(event.target.value)}
        />
        <AuthInput
            id="email"
            label={t('Email')}
            type="email"
            placeholder={t('Enter email')}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
        <AuthPassword
            id="password"
            forgettable={false}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
        />
        <Button onClick={signUp}>
            {t('Sign up')}
        </Button>
        <AuthDivider text={t('or')} />
        <AuthProviders />
        <AuthDivider />
        <div className="text-center text-sm w-full">
            {t('Already have an account?')}
            {' '}
            <Link
                href="/apps/web/src/app/(auth)/signin/signin"
                className="underline underline-offset-4"
            >
                {t('Sign in')}
            </Link>
        </div>
    </AuthMask>
}
