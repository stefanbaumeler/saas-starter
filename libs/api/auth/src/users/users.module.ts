import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersResolver } from './users.resolver'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { drizzleProvider } from '@saas-starter/db'
import { AuthService } from '../auth/auth.service'

@Module({
    controllers: [UsersController],
    providers: [
        UsersRepository,
        UsersResolver,
        UsersService,
        AuthService,
        ...drizzleProvider
    ]
})
export class UsersModule {
}
