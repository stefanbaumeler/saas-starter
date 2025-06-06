'use client'

import { Reset } from '@/components/auth/Reset'
import { Forget } from '@/components/auth/Forget'
import { useSearchParams } from 'next/navigation'

const ResetPage = () => {
    const urlParams = useSearchParams()
    const token = urlParams.get('token')

    return token ? <Reset token={token} /> : <Forget />
}

export default ResetPage
