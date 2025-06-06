import { Inject,
    Logger,
    Module,
    type MiddlewareConsumer,
    type NestModule,
    type OnModuleInit,
    type Provider } from '@nestjs/common'
import { APP_FILTER, DiscoveryModule, DiscoveryService, HttpAdapterHost, MetadataScanner } from '@nestjs/core'
import { type Auth, MiddlewareContext, MiddlewareOptions } from 'better-auth'
import { createAuthMiddleware } from 'better-auth/plugins'
import { toNodeHandler } from 'better-auth/node'
import { AuthService } from './auth.service'
import { BEFORE_HOOK_KEY, AFTER_HOOK_KEY, HOOK_KEY, AUTH_INSTANCE_KEY, AUTH_MODULE_OPTIONS_KEY } from './symbols'
import { APIErrorExceptionFilter } from './api-error-exception-filter'
import { SkipBodyParsingMiddleware } from './middlewares'
import type { Request, Response } from 'express'
import { MailModule } from '@saas-starter/mail'
import { BetterAuthProvider } from './better-auth.provider'

/**
 * Configuration options for the AuthModule
 */
type AuthModuleOptions = {
    disableExceptionFilter?: boolean
    disableTrustedOriginsCors?: boolean
    disableBodyParser?: boolean
}

const HOOKS = [
    {
        metadataKey: BEFORE_HOOK_KEY,
        hookType: 'before' as const
    },
    {
        metadataKey: AFTER_HOOK_KEY,
        hookType: 'after' as const
    }
]

@Module({
    providers: [BetterAuthProvider],
    imports: [DiscoveryModule, MailModule]
})
export class AuthModule implements NestModule, OnModuleInit {
    private logger = new Logger(AuthModule.name)

    constructor (
        @Inject(AUTH_INSTANCE_KEY) private readonly auth: Auth,
        @Inject(DiscoveryService)
        private discoveryService: DiscoveryService,
        @Inject(MetadataScanner)
        private metadataScanner: MetadataScanner,
        @Inject(HttpAdapterHost)
        private readonly adapter: HttpAdapterHost,
        @Inject(AUTH_MODULE_OPTIONS_KEY)
        private readonly options: AuthModuleOptions
    ) {
    }

    onModuleInit () {
        // Setup hooks
        if (!this.auth.options.hooks) {
            return
        }

        const providers = this.discoveryService
            .getProviders()
            .filter(({
                metatype
            }) => metatype && Reflect.getMetadata(HOOK_KEY, metatype))

        for (const provider of providers) {
            const providerPrototype = Object.getPrototypeOf(provider.instance)

            const methods = this.metadataScanner.getAllMethodNames(providerPrototype)

            for (const method of methods) {
                const providerMethod = providerPrototype[method]
                this.setupHooks(providerMethod)
            }
        }
    }

    configure (consumer: MiddlewareConsumer) {
        const trustedOrigins = this.auth.options.trustedOrigins
        const isNotFunctionBased = trustedOrigins && Array.isArray(trustedOrigins)

        if (!this.options.disableTrustedOriginsCors && isNotFunctionBased) {
            this.adapter.httpAdapter.enableCors({
                origin: trustedOrigins,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                credentials: true
            })
        } else if (
            trustedOrigins &&
            !this.options.disableTrustedOriginsCors &&
            !isNotFunctionBased
        ) {
            throw new Error('Function-based trustedOrigins not supported in NestJS. Use string array or disable CORS with disableTrustedOriginsCors: true.')
        }

        if (!this.options.disableBodyParser) {
            consumer.apply(SkipBodyParsingMiddleware).forRoutes('*path')
        }

        let basePath = this.auth.options.basePath ?? '/api/auth'

        if (!basePath.startsWith('/')) {
            basePath = `/${basePath}`
        }

        if (basePath.endsWith('/')) {
            basePath = basePath.slice(0, -1)
        }

        const handler = toNodeHandler(this.auth)

        this.adapter.httpAdapter
            .getInstance()
            .use(`${basePath}/*path`, (req: Request, res: Response) => {
                req.url = req.originalUrl

                return handler(req, res)
            })

        this.logger.log(`AuthModule initialized BetterAuth on '${basePath}/*'`)
    }

    private setupHooks (providerMethod: (ctx: MiddlewareContext<MiddlewareOptions>) => Promise<void>) {
        if (!this.auth.options.hooks) {
            return
        }

        for (const {
            metadataKey, hookType
        } of HOOKS) {
            const hookPath = Reflect.getMetadata(metadataKey, providerMethod)

            if (!hookPath) {
                continue
            }

            const originalHook = this.auth.options.hooks[hookType]
            this.auth.options.hooks[hookType] = createAuthMiddleware(async (ctx) => {
                if (originalHook) {
                    await originalHook(ctx)
                }

                if (hookPath === ctx.path) {
                    await providerMethod(ctx)
                }
            })
        }
    }

    static forRoot (options: AuthModuleOptions = {}) {
        const providers: Provider[] = [
            {
                provide: AUTH_MODULE_OPTIONS_KEY,
                useValue: options
            },
            {
                provide: AUTH_INSTANCE_KEY,
                inject: [BetterAuthProvider],
                useFactory: (betterAuthProvider: BetterAuthProvider) => {
                    return betterAuthProvider.getAuthInstance()
                }
            },
            AuthService
        ]

        if (!options.disableExceptionFilter) {
            providers.push({
                provide: APP_FILTER,
                useClass: APIErrorExceptionFilter
            })
        }

        return {
            global: true,
            module: AuthModule,
            providers,
            exports: [
                AUTH_INSTANCE_KEY,
                {
                    provide: AUTH_MODULE_OPTIONS_KEY,
                    useValue: options
                },
                AuthService
            ]
        }
    }
}
