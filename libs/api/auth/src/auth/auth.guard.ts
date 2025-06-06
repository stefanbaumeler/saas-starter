import { Inject, Injectable, type CanActivate, type ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import type { Auth } from 'better-auth'
import { AUTH_INSTANCE_KEY } from './symbols'
import { GqlExecutionContext } from '@nestjs/graphql'
import { GraphQLError } from 'graphql/error'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor (
        @Inject(Reflector)
        private readonly reflector: Reflector,
        @Inject(AUTH_INSTANCE_KEY)
        private readonly auth: Auth
    ) {
    }

    async canActivate (context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context)
        const request = ctx.getContext().req

        const session = await this.auth.api.getSession({
            headers: {
                ...request.headers,
                cookie: request.headers.cookie || request.cookies
            }
        })

        request.session = session
        request.user = session?.user ?? null // useful for observability tools like Sentry

        const isPublic = this.reflector.get('PUBLIC', ctx.getHandler())

        if (isPublic) {
            return true
        }

        const isOptional = this.reflector.get('OPTIONAL', ctx.getHandler())

        if (isOptional && !session) {
            return true
        }

        if (!session)
        {
            throw new GraphQLError('UNAUTHORIZED', {
                extensions: {
                    code: 401
                }
            })
        }

        return true
    }
}
