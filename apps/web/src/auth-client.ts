import { createAuthClient } from 'better-auth/react'
import { twoFactorClient } from 'better-auth/plugins'
import 'better-auth'

export const authClient = createAuthClient({
    baseURL: `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api/auth`,
    plugins: [
        twoFactorClient()
    ]
})
