'use client'

import { AuthMask } from '@/components/auth/AuthMask'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { useTranslations } from 'next-intl'
import { AuthInput } from '@/components/auth/AuthInput'
import { useState } from 'react'
import { Button, buttonVariants } from '@saas-starter/ui/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { authClient } from '@/auth-client'
import { ResetLinkSentAlert } from '@/components/auth/alerts/ResetLinkSentAlert'

export const Forget = () => {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)
    const t = useTranslations()

    const reset = async () => {
        const {
            data
        } = await authClient.forgetPassword({
            email,
            redirectTo: window.location.href
        })

        if (data?.status) {
            setSent(true)
        }
    }

    return <AuthMask>
        <AuthTitle text={t('Reset password')} />
        {sent ? <ResetLinkSentAlert /> : null}
        <AuthInput
            id="email"
            value={email}
            label={t('Email')}
            placeholder={t('Enter email')}
            onChange={(event) => setEmail(event.target.value)}
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
