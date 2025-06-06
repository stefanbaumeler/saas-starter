import { Button } from '@saas-starter/ui/Button'
import { authClient } from '@/auth-client'
import { useTranslations } from 'next-intl'
import { SiApple, SiGithub, SiGoogle } from '@icons-pack/react-simple-icons'

export const AuthProviders = () => {
    const t = useTranslations()

    const handleGitHub = async () => {
        const response = await authClient.signIn.social({
            provider: 'github'
        })
    }

    return <>
        <Button
            variant="outline"
            className="relative w-full"
            onClick={handleGitHub}
        >
            <SiGithub
                className="absolute left-4"
                size={20}
            />
            {t('Continue with', {
                thing: 'GitHub'
            })}
        </Button>
        <Button
            variant="outline"
            className="relative w-full"
            onClick={handleGitHub}
        >
            <SiGoogle
                className="absolute left-4"
                size={20}
            />
            {t('Continue with', {
                thing: 'Google'
            })}
        </Button>
        <Button
            variant="outline"
            className="relative w-full"
            onClick={handleGitHub}
        >
            <SiApple
                className="absolute left-4"
                size={20}
            />
            {t('Continue with', {
                thing: 'Apple'
            })}
        </Button>
    </>
}
