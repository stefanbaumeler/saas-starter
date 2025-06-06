import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Example } from './examples.model'
import { IdDto, IdsDto } from '@saas-starter/id'
import { ExampleCreateDto, ExampleUpdateDto } from './examples.dto'
import { ExamplesService } from './examples.service'

@Resolver(() => Example)
export class ExamplesResolver {
    constructor (private readonly service: ExamplesService) {
    }

    @Query(() => [Example])
    async examples () {
        return this.service.getAll()
    }

    @Query(() => Example)
    async example (@Args() dto: IdDto) {
        return this.service.getById(dto)
    }

    @Mutation(() => [Example])
    async deleteExample (@Args() dto: IdsDto) {
        return this.service.delete(dto)
    }

    @Mutation(() => Example)
    async updateExample (@Args() dto: ExampleUpdateDto) {
        return this.service.update(dto)
    }

    @Mutation(() => Example)
    async createExample (@Args() example: ExampleCreateDto) {
        return this.service.create(example)
    }
}
