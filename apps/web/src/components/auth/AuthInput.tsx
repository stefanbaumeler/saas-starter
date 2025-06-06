import { Label } from '@saas-starter/ui/Label'
import { Input } from '@saas-starter/ui/Input'
import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react'

type Props = {
    id: string
    type?: HTMLInputTypeAttribute
    value: string
    label: string
    placeholder: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

export const AuthInput = ({
    id, type = 'text', value, label, placeholder, onChange
}: Props) => {
    return <div className="grid gap-2 w-full">
        <Label htmlFor={id}>
            {label}
        </Label>
        <Input
            type={type}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
        />
    </div>
}
