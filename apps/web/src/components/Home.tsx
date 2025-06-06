'use client'

import { Button } from '@saas-starter/ui/Button'
import { authClient } from '@/auth-client'
import { useUserContext } from '@/context/user'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const Home = () => {
    const {
        user
    } = useUserContext()

    const t = useTranslations()
    const router = useRouter()

    const signOut = async () => {
        await authClient.signOut()

        router.refresh()
    }

    return <div>
        <h1 className="text-3xl font-bold underline pointer-events-none">
            {user ? `You are currently signed in as ${user.email}` : 'You are not currently signed in'}
        </h1>
        {user ? <Button onClick={signOut}>
            {t('Sign out')}
        </Button> : <Link href="/apps/web/src/app/(auth)/signin/signin">
            {t('Sign in')}
        </Link>}
    </div>
}
