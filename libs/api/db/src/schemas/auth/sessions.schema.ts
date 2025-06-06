import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { users } from './users.schema'

export const sessions = pgTable('sessions', {
    id: uuid().defaultRandom().primaryKey().notNull(),
    expiresAt: timestamp().notNull(),
    token: text().notNull().unique(),
    createdAt: timestamp().notNull(),
    updatedAt: timestamp().notNull(),
    ipAddress: text(),
    userAgent: text(),
    userId: uuid().notNull().references(() => users.id, {
        onDelete: 'cascade'
    })
})
