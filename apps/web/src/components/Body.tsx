'use client'

import { ReactNode } from 'react'
import { DarkMode, useDarkContext } from '@/context/dark'

type Props = {
    children: ReactNode
}

export const Body = ({
    children
}: Props) => {
    const {
        state
    } = useDarkContext()

    return <body className={state === DarkMode.Dark ? 'dark' : 'light'}>
        {children}
    </body>
}
