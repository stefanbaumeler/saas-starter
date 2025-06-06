'use client'

import { useEffect, useState } from 'react'
import { Button } from '@saas-starter/ui/Button'
import { useTranslations } from 'next-intl'
import { AuthError } from '@/components/auth/alerts/AuthError'
import { AuthTitle } from '@/components/auth/AuthTitle'
import { AuthMask } from '@/components/auth/AuthMask'
import { AuthPassword } from '@/components/auth/AuthPassword'
import { authClient } from '@/auth-client'
import { AuthBackupCode } from '@/components/auth/AuthBackupCode'

type Props = {
    initialBackupCodes?: string[]
}

export const BackupTwoFactor = ({
    initialBackupCodes
}: Props) => {
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [password, setPassword] = useState('')
    const [wantsToGenerate, setWantsToGenerate] = useState(false)
    const [error, setError] = useState('')
    const t = useTranslations()
    const authTranslations = useTranslations('Auth')

    const generate = async () => {
        if (wantsToGenerate) {
            const response = await authClient.twoFactor.generateBackupCodes({
                password
            })

            if (response.error?.code) {
                // @ts-expect-error Type for variable unavailable
                setError(authTranslations(response.error.code))
            }
            else {
                setBackupCodes(response.data?.backupCodes ?? [])
                setWantsToGenerate(false)
            }
        }
        else {
            setWantsToGenerate(true)
        }
    }

    useEffect(() => {
        const padding = new Array(10 - (initialBackupCodes?.length ?? 0)).fill(undefined)
        const paddedCodes = [...padding, ...initialBackupCodes ?? []]

        setBackupCodes(paddedCodes)
    }, [initialBackupCodes])

    return <AuthMask>
        <AuthTitle text={t('Two-Factor recovery codes')} />
        <AuthError error={error} />
        {!wantsToGenerate ? <div className="flex flex-wrap gap-4 justify-center">
            {backupCodes?.map((backupCode) => <AuthBackupCode
                code={backupCode}
            />)}
        </div> : null}

        {wantsToGenerate ? <>
            <AuthPassword
                forgettable={false}
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
        </> : null}
        <Button
            onClick={generate}
            className="w-full"
        >
            {t('Generate new codes')}
        </Button>
    </AuthMask>
}
