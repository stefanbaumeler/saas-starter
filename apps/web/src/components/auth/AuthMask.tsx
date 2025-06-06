import { Card, CardContent } from '@saas-starter/ui/Card'
import { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
    children: ReactNode
}

export const AuthMask = ({
    children
}: Props) => {
    return <div className="flex min-h-svh w-full sm:p-10">
        <div className="w-full">
            <Card className="p-0 overflow-hidden h-full">
                <CardContent className="px-0 flex h-full">
                    <div className="flex flex-col gap-6 p-6 w-full lg:w-lg flex-shrink-0 justify-center items-center">
                        <div className="flex flex-col gap-6 w-sm max-w-full items-start">
                            {children}
                        </div>
                    </div>
                    <div className="relative hidden bg-muted lg:block w-full">
                        <Image
                            src="/placeholder.svg"
                            alt="Image"
                            fill={true}
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
}
