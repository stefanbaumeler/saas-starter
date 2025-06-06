/* eslint-disable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any */
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
export type Maybe<T> = T
export type InputMaybe<T> = T
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type TResolversTypes = {
    Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>
    DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>
    Example: ResolverTypeWrapper<TExample>
    Mutation: ResolverTypeWrapper<{}>
    Query: ResolverTypeWrapper<{}>
    Session: ResolverTypeWrapper<TSession>
    String: ResolverTypeWrapper<Scalars['String']['output']>
    User: ResolverTypeWrapper<TUser>
}

/** Mapping between all available schema types and the resolvers parents */
export type TResolversParentTypes = {
    Boolean: Scalars['Boolean']['output']
    DateTime: Scalars['DateTime']['output']
    Example: TExample
    Mutation: {}
    Query: {}
    Session: TSession
    String: Scalars['String']['output']
    User: TUser
}

export interface TDateTimeScalarConfig extends GraphQLScalarTypeConfig<TResolversTypes['DateTime'], any> {
    name: 'DateTime'
}

export type TExampleResolvers<ContextType = any, ParentType extends TResolversParentTypes['Example'] = TResolversParentTypes['Example']> = {
    id: Resolver<TResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TMutationResolvers<ContextType = any, ParentType extends TResolversParentTypes['Mutation'] = TResolversParentTypes['Mutation']> = {
    createExample: Resolver<TResolversTypes['Example'], ParentType, ContextType>
    createUser: Resolver<TResolversTypes['User'], ParentType, ContextType>
    deleteExample: Resolver<TResolversTypes['Example'][], ParentType, ContextType, RequireFields<TMutationDeleteExampleArgs, 'ids'>>
    deleteUser: Resolver<TResolversTypes['User'][], ParentType, ContextType, RequireFields<TMutationDeleteUserArgs, 'ids'>>
    updateExample: Resolver<TResolversTypes['Example'], ParentType, ContextType, RequireFields<TMutationUpdateExampleArgs, 'id'>>
    updateUser: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TMutationUpdateUserArgs, 'id'>>
}

export type TQueryResolvers<ContextType = any, ParentType extends TResolversParentTypes['Query'] = TResolversParentTypes['Query']> = {
    backupCodes: Resolver<TResolversTypes['String'][], ParentType, ContextType, RequireFields<TQueryBackupCodesArgs, 'id'>>
    example: Resolver<TResolversTypes['Example'], ParentType, ContextType, RequireFields<TQueryExampleArgs, 'id'>>
    examples: Resolver<TResolversTypes['Example'][], ParentType, ContextType>
    user: Resolver<TResolversTypes['User'], ParentType, ContextType, RequireFields<TQueryUserArgs, 'id'>>
}

export type TSessionResolvers<ContextType = any, ParentType extends TResolversParentTypes['Session'] = TResolversParentTypes['Session']> = {
    createdAt: Resolver<TResolversTypes['String'], ParentType, ContextType>
    expiresAt: Resolver<TResolversTypes['String'], ParentType, ContextType>
    id: Resolver<TResolversTypes['String'], ParentType, ContextType>
    ipAddress: Resolver<TResolversTypes['String'], ParentType, ContextType>
    token: Resolver<TResolversTypes['String'], ParentType, ContextType>
    updatedAt: Resolver<TResolversTypes['DateTime'], ParentType, ContextType>
    userAgent: Resolver<TResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TUserResolvers<ContextType = any, ParentType extends TResolversParentTypes['User'] = TResolversParentTypes['User']> = {
    createdAt: Resolver<TResolversTypes['String'], ParentType, ContextType>
    email: Resolver<TResolversTypes['String'], ParentType, ContextType>
    emailVerified: Resolver<TResolversTypes['Boolean'], ParentType, ContextType>
    id: Resolver<TResolversTypes['String'], ParentType, ContextType>
    image: Resolver<TResolversTypes['String'], ParentType, ContextType>
    role: Resolver<TResolversTypes['String'], ParentType, ContextType>
    twoFactorEnabled: Resolver<TResolversTypes['String'], ParentType, ContextType>
    updatedAt: Resolver<TResolversTypes['String'], ParentType, ContextType>
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type TResolvers<ContextType = any> = {
    DateTime: GraphQLScalarType
    Example: TExampleResolvers<ContextType>
    Mutation: TMutationResolvers<ContextType>
    Query: TQueryResolvers<ContextType>
    Session: TSessionResolvers<ContextType>
    User: TUserResolvers<ContextType>
}

/* eslint-enable @typescript-eslint/no-empty-object-type, @typescript-eslint/no-explicit-any */