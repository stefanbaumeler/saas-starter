'use client'

import { useUserContext } from '@/context/user'
import { EmailVerifyAlert } from '@/components/auth/alerts/EmailVerifyAlert'
import { useSearchParams } from 'next/navigation'
import { EmailVerifiedAlert } from '@/components/auth/alerts/EmailVerifiedAlert'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const DashboardPage = () => {
    const t = useTranslations()
    const {
        user
    } = useUserContext()

    const searchParams = useSearchParams()

    console.log(user)

    return <>
        {!user?.emailVerified ? <EmailVerifyAlert /> : null}
        {searchParams.get('verified') ? <EmailVerifiedAlert /> : null}
        <h1>
            Dashboard
        </h1>
        {user?.twoFactorEnabled ? <>
            <Link href="/two-factor/disable">
                {t('Disable two-factor authentication')}
            </Link>
            <Link href="/two-factor/backup">
                {t('Manage backup codes')}
            </Link>
        </> : <Link href="/two-factor/setup">
            {t('Setup Two-factor Authentication')}
        </Link>}
    </>
}

export default DashboardPage
