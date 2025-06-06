import { getLocale } from 'next-intl/server'
import { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'

import '@/styles/global.css'
import { betterFetch } from '@better-fetch/fetch'
import { cookies, headers } from 'next/headers'
import { UserProvider } from '@/context/user'
import { UAProvider } from '@/context/ua'
import { TSession, TUser } from '@saas-starter/schema/web'
import { DarkMode, DarkProvider } from '@/context/dark'
import { Body } from '@/components/Body'

const RootLayout = async ({
    children
}: {
    children: ReactNode
}) => {
    const locale = await getLocale()

    const {
        data
    } = await betterFetch<{
        user: TUser
        session: TSession
    }>('/api/auth/get-session', {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
            cookie: (await cookies()).toString()
        }
    })

    const headersList = await headers()

    const theme = headersList.get('Sec-CH-Prefers-Color-Scheme')

    return <html lang={locale}>
        <UAProvider>
            <DarkProvider initialTheme={theme as DarkMode}>
                <UserProvider
                    user={data?.user}
                    session={data?.session}
                >
                    <NextIntlClientProvider>
                        <Body>
                            {children}
                        </Body>
                    </NextIntlClientProvider>
                </UserProvider>
            </DarkProvider>
        </UAProvider>
    </html>
}

export default RootLayout
