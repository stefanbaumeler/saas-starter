import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { IdDto, IdsDto } from '@saas-starter/id'
import { UserCreateDto, UserUpdateDto } from './users.dto'

@Injectable()
export class UsersService {
    constructor (private repository: UsersRepository) {
    }

    async getAll () {
        return this.repository.all()
    }

    async getById (dto: IdDto) {
        return this.repository.findById(dto)
    }

    async delete (dto: IdsDto) {
        const users = await this.repository.findByIds(dto)

        await this.repository.deleteMany(dto)

        return users
    }

    async update (dto: UserUpdateDto) {
        return this.repository.update(dto)
    }

    async create (user: UserCreateDto) {
        return this.repository.create(user)
    }
}
