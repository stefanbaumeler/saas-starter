import { pgTable, uuid } from 'drizzle-orm/pg-core'

export const examples = pgTable('examples', {
    id: uuid('id').defaultRandom().primaryKey().notNull()
})
