import { Inject, Injectable } from '@nestjs/common'
import { IdDto, IdsDto } from '@saas-starter/id'
import { ExampleCreateDto, ExampleUpdateDto } from './examples.dto'
import { DrizzleAsyncProvider, schema } from '@saas-starter/db'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { eq, getTableColumns, inArray } from 'drizzle-orm'

@Injectable()
export class ExamplesRepository {
    constructor (@Inject(DrizzleAsyncProvider) private db: NodePgDatabase<typeof schema>) {
    }

    columns = getTableColumns(schema.examples)

    async all () {
        return this.db.select().from(schema.examples)
    }

    async findById (dto: IdDto) {
        const examples = this.db.select().from(schema.examples)

        const selectedExamples = await examples.where(eq(schema.examples.id, dto.id))

        return selectedExamples[0]
    }

    async findByIds (dto: IdsDto) {
        const query = this.db.select().from(schema.examples)

        return query.where(inArray(schema.examples.id, dto.ids))
    }

    async deleteMany (dto: IdsDto) {
        return this.db
            .delete(schema.examples)
            .where(inArray(schema.examples.id, dto.ids))
            .returning(this.columns)
    }

    async update (dto: ExampleUpdateDto) {
        const {
            id, ...data
        } = dto

        return this.db
            .update(schema.examples)
            .set({
                ...data
            })
            .where(eq(schema.examples.id, id))
            .returning(this.columns)
    }

    async create (examplesToCreate: ExampleCreateDto) {
        const createdExample = await this.db
            .insert(schema.examples)
            .values({
                ...examplesToCreate
            })
            .returning({
                id: schema.examples.id
            })

        return this.findById({
            id: createdExample[0].id
        })
    }
}
