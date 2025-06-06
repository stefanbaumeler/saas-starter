/* eslint-disable @typescript-eslint/no-explicit-any */
import gql from 'graphql-tag'
export type Maybe<T> = T
export type InputMaybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string
        output: string }
    String: { input: string
        output: string }
    Boolean: { input: boolean
        output: boolean }
    Int: { input: number
        output: number }
    Float: { input: number
        output: number }
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: { input: any
        output: any }
}

export type TExample = {
    __typename?: 'Example'
    id: Scalars['String']['output']
}

export type TMutation = {
    __typename?: 'Mutation'
    createExample: TExample
    createUser: TUser
    deleteExample: TExample[]
    deleteUser: TUser[]
    updateExample: TExample
    updateUser: TUser
}

export type TMutationDeleteExampleArgs = {
    ids: Scalars['String']['input'][]
}

export type TMutationDeleteUserArgs = {
    ids: Scalars['String']['input'][]
}

export type TMutationUpdateExampleArgs = {
    id: Scalars['String']['input']
}

export type TMutationUpdateUserArgs = {
    id: Scalars['String']['input']
}

export type TQuery = {
    __typename?: 'Query'
    backupCodes: Scalars['String']['output'][]
    example: TExample
    examples: TExample[]
    user: TUser
}

export type TQueryBackupCodesArgs = {
    id: Scalars['String']['input']
}

export type TQueryExampleArgs = {
    id: Scalars['String']['input']
}

export type TQueryUserArgs = {
    id: Scalars['String']['input']
}

export type TSession = {
    __typename?: 'Session'
    createdAt: Scalars['String']['output']
    expiresAt: Scalars['String']['output']
    id: Scalars['String']['output']
    ipAddress: Scalars['String']['output']
    token: Scalars['String']['output']
    updatedAt: Scalars['DateTime']['output']
    userAgent: Scalars['String']['output']
}

export type TUser = {
    __typename?: 'User'
    createdAt: Scalars['String']['output']
    email: Scalars['String']['output']
    emailVerified: Scalars['Boolean']['output']
    id: Scalars['String']['output']
    image: Scalars['String']['output']
    role: Scalars['String']['output']
    twoFactorEnabled: Scalars['String']['output']
    updatedAt: Scalars['String']['output']
}

export type TQBackupCodesVariables = Exact<{
    id: Scalars['String']['input']
}>

export type TQBackupCodes = (
  { __typename?: 'Query' }
  & Pick<TQuery, 'backupCodes'>
)

export type TQExampleVariables = Exact<{ [key: string]: never }>

export type TQExample = (
  { __typename?: 'Query' }
  & { examples: ({ __typename?: 'Example' }
    & Pick<TExample, 'id'>)[] }
)

export const QBackupCodesDocument = gql`
    query QBackupCodes($id: String!) {
  backupCodes(id: $id)
}
    `
export const QExampleDocument = gql`
    query QExample {
  examples {
    id
  }
}
    `
/* eslint-enable @typescript-eslint/no-explicit-any */