import { betterFetch } from '@better-fetch/fetch'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (request: NextRequest) => {
    const {
        data: session
    } = await betterFetch('/api/auth/get-session', {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
            cookie: request.headers.get('cookie') || ''
        }
    })

    if (!session) {
        return NextResponse.redirect(new URL('/signin', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!signin|signup|reset|two-factor/verify|_next/static|_next/image|$).*)']
}
