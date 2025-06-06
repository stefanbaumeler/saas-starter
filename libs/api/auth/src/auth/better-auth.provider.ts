import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { drizzle, schema } from '@saas-starter/db'
import { twoFactor } from 'better-auth/plugins'
import { Inject, Injectable } from '@nestjs/common'
import { MailService } from '@saas-starter/mail'

export type TSession = Awaited<ReturnType<ReturnType<BetterAuthProvider['getAuthInstance']>['api']['getSession']>>

@Injectable()
export class BetterAuthProvider {
    private readonly authInstance

    constructor (@Inject(MailService) private mailService: MailService) {
        this.authInstance = betterAuth({
            appName: 'SAAS STARTER',
            trustedOrigins: (process.env.TRUSTED_ORIGINS as string).split(','),
            database: drizzleAdapter(drizzle, {
                provider: 'pg',
                schema,
                usePlural: true
            }),
            emailAndPassword: {
                enabled: true,
                sendResetPassword: async ({
                    user, url
                }) => {
                    await this.mailService.sendResetPasswordMail({
                        to: user.email,
                        url
                    })
                }
            },
            emailVerification: {
                sendVerificationEmail: async ({
                    user, url
                }) => {
                    await this.mailService.sendEmailVerificationMail({
                        to: user.email,
                        url
                    })
                }
            },
            session: {
                freshAge: 10
            },
            user: {
                additionalFields: {
                    role: {
                        type: 'string',
                        defaultValue: 'user'
                    }
                }
            },
            advanced: {
                generateId: false,
                database: {
                    generateId: false
                }
            },
            plugins: [
                twoFactor({
                    schema: {
                        user: {
                            modelName: 'users'
                        },
                        twoFactor: {
                            modelName: 'twoFactors'
                        }
                    }
                })
            ]
        })
    }

    getAuthInstance = () => {
        return this.authInstance
    }
}
