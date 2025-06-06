import { BackupTwoFactor } from '@/components/auth/two-factor/BackupTwoFactor'
import { urqlClient } from '@/gql/urql'
import { QBackupCodesDocument, TQBackupCodes, TSession, TUser } from '@saas-starter/schema/web'
import { betterFetch } from '@better-fetch/fetch'
import { cookies } from 'next/headers'

const BackupTwoFactorPage = async () => {
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

    const response = await urqlClient.query<TQBackupCodes>(QBackupCodesDocument, {
        id: data?.user.id
    })

    return <BackupTwoFactor initialBackupCodes={response.data?.backupCodes} />
}

export default BackupTwoFactorPage
