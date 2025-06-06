import { text, pgTable, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const twoFactors = pgTable('twoFactors', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    userId: uuid().notNull().references(() => users.id, {
        onDelete: 'cascade'
    }),
    secret: text(),
    backupCodes: text()
})
