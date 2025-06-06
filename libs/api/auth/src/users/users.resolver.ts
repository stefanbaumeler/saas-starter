import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from './users.model'
import { IdDto, IdsDto } from '@saas-starter/id'
import { UserCreateDto, UserUpdateDto } from './users.dto'
import { UsersService } from './users.service'
import { AuthService } from '../auth/auth.service'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { Session } from '../auth/decorators'
import { GraphQLError } from 'graphql/error'
import { type TSession } from '../auth/better-auth.provider'

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UsersResolver {
    constructor (private readonly service: UsersService, private readonly authService: AuthService) {
    }

    @Query(() => [String])
    async backupCodes (@Args() dto: IdDto, @Session() session: TSession) {
        if (dto.id !== session?.user.id || !session?.user.twoFactorEnabled) {
            throw new GraphQLError('UNAUTHORIZED', {
                extensions: {
                    code: 401
                }
            })
        }

        const response = await this.authService.api.viewBackupCodes({
            body: {
                userId: dto.id
            }
        })

        return response.backupCodes
    }

    @Query(() => User)
    async user (@Args() dto: IdDto) {
        return this.service.getById(dto)
    }

    @Mutation(() => [User])
    async deleteUser (@Args() dto: IdsDto) {
        return this.service.delete(dto)
    }

    @Mutation(() => User)
    async updateUser (@Args() dto: UserUpdateDto) {
        return this.service.update(dto)
    }

    @Mutation(() => User)
    async createUser (@Args() user: UserCreateDto) {
        return this.service.create(user)
    }
}
