import { Module, Provider } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { ConfigModule } from '@nestjs/config'
import { Request, Response } from 'express'
import { MailModule } from '@saas-starter/mail'
import { BullModule } from '@nestjs/bull'
import { ExamplesModule } from '../examples/examples.module'
import { AuthModule, Session, UsersModule } from '@saas-starter/auth'
import { I18nConfig } from '@saas-starter/i18n'

const providers: Provider[] = [AppService]

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            context: ({
                req, res
            }: {
                req: Request
                res: Response
            }) => {
                return {
                    req,
                    res
                }
            },
            driver: ApolloDriver,
            autoSchemaFile: '../../libs/shared/schema/src/schema.gql',
            playground: {
                settings: {
                    'request.credentials': 'include'
                }
            },
            buildSchemaOptions: {
                orphanedTypes: [Session]
            }
        }),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT ?? '')
            }
        }),
        I18nConfig,
        MailModule,
        AuthModule.forRoot(),
        UsersModule,
        ExamplesModule
    ],
    controllers: [AppController],
    providers
})
export class AppModule {
}
