import { useTranslations } from 'next-intl'
import { Button } from '@saas-starter/ui/Button'
import { redirect } from 'next/navigation'
import { Setup2FACompleteAlert } from '@/components/auth/alerts/Setup2FACompleteAlert'

type Props = {
    show: boolean
    backupCodes: string[]
}

export const SetupTwoFactorStep3 = ({
    show,
    backupCodes
}: Props) => {
    const t = useTranslations()

    const finish = () => {
        redirect('/dashboard')
    }

    return show ? <>
        <Setup2FACompleteAlert />
        <div>
            {t('Keep these backup codes somewhere safe but accessible')}
        </div>
        <div className="flex flex-wrap gap-4">
            {backupCodes.map((backupCode) => <span className="font-mono font-bold text-lg">
                {backupCode}
            </span>)}
        </div>
        <Button onClick={finish}>
            {t('Finish')}
        </Button>
    </> : null
}
