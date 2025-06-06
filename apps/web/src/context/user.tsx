'use client'

import { createContext, ReactNode, useContext } from 'react'
import { TSession, TUser } from '@saas-starter/schema/web'

type Props = {
    children?: ReactNode
    session?: TSession
    user?: TUser
}

type TUserContext = {
    session?: TSession
    user?: TUser
}

const UserContext = createContext<TUserContext | null>(null)

const UserProvider = ({
    children, session, user
}: Props) => {
    return <UserContext.Provider value={{
        session,
        user
    }}
    >
        {children}
    </UserContext.Provider>
}

const useUserContext = () => {
    const ctx = useContext(UserContext)

    if (!ctx) {
        throw new Error('Context not defined')
    }

    return ctx
}

export { UserProvider, useUserContext }
