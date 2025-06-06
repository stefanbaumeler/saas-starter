import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@saas-starter/ui/InputOTP'
import { ComponentProps } from 'react'

export const AuthOTP = (props: Omit<ComponentProps<typeof InputOTP>, 'children' | 'render' | 'maxLength'>) => {
    return <InputOTP
        maxLength={6}
        {...props}
    >
        <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
        </InputOTPGroup>
    </InputOTP>
}
