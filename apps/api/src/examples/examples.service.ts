import { Injectable } from '@nestjs/common'
import { ExamplesRepository } from './examples.repository'
import { IdDto, IdsDto } from '@saas-starter/id'
import { ExampleCreateDto, ExampleUpdateDto } from './examples.dto'

@Injectable()
export class ExamplesService {
    constructor (private repository: ExamplesRepository) {
    }

    async getAll () {
        return this.repository.all()
    }

    async getById (dto: IdDto) {
        return this.repository.findById(dto)
    }

    async delete (dto: IdsDto) {
        const examples = await this.repository.findByIds(dto)

        await this.repository.deleteMany(dto)

        return examples
    }

    async update (dto: ExampleUpdateDto) {
        return this.repository.update(dto)
    }

    async create (example: ExampleCreateDto) {
        return this.repository.create(example)
    }
}
