import { cacheExchange, fetchExchange, createClient } from 'urql'
import { cookies } from 'next/headers'

const requestCookies = (await cookies()).toString()

export const urqlClient = createClient({
    url: `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: {
        credentials: 'include',
        headers: {
            Cookie: requestCookies
        }
    }
})
