import { composePlugins, withNx } from '@nx/next'
import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
    output: 'standalone',
    reactStrictMode: true,
    experimental: {
        reactCompiler: true
    },
    nx: {
        svgr: false
    },
    headers: async () => {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Accept-CH',
                        value: 'Sec-CH-Prefers-Color-Scheme'
                    },
                    {
                        key: 'Vary',
                        value: 'Sec-CH-Prefers-Color-Scheme'
                    },
                    {
                        key: 'Critical-CH',
                        value: 'Sec-CH-Prefers-Color-Scheme'
                    }
                ]
            }
        ]
    }
}

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: './messages/en.json'
    }
})

const plugins = [
    withNx,
    withNextIntl
]

export default composePlugins(...plugins)(nextConfig)

