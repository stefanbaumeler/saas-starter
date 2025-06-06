import { Label } from '@saas-starter/ui/Label'
import { Input } from '@saas-starter/ui/Input'
import { ChangeEventHandler } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

type Props = {
    id: string
    forgettable?: boolean
    forgot?: string
    value: string
    label?: string
    placeholder?: string
    onChange?: ChangeEventHandler<HTMLInputElement>
}

export const AuthPassword = ({
    id, forgettable = true, forgot, value, label, placeholder, onChange
}: Props) => {
    const t = useTranslations()

    return <div className="grid gap-2 w-full">
        <div className="flex justify-between">
            <Label htmlFor={id}>
                {label ?? t('Password')}
            </Label>
            {forgettable ? <Link
                href="/reset"
                className="text-sm hover:underline underline-offset-4"
            >
                {forgot ?? t('Forgot your password?')}
            </Link> : null}
        </div>
        <Input
            type="password"
            placeholder={placeholder ?? t('Enter password')}
            id={id}
            value={value}
            onChange={onChange}
        />
    </div>
}
