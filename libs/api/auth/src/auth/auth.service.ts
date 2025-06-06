import { Inject } from '@nestjs/common'
import { AUTH_INSTANCE_KEY } from './symbols'
import { BetterAuthProvider } from './better-auth.provider'

export class AuthService {
    constructor (@Inject(AUTH_INSTANCE_KEY)
    private readonly auth: { api: ReturnType<BetterAuthProvider['getAuthInstance']>['api'] }) {
    }

    get api () {
        return this.auth.api
    }

    get instance () {
        return this.auth
    }
}
