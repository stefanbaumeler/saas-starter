import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import * as schema from './schemas'
import { drizzle as drizzleClient } from 'drizzle-orm/node-postgres'

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const dialect = new PostgresDialect({
    pool
})

export const kysely = new Kysely<typeof schema>({
    dialect
})

export const drizzle = drizzleClient(pool, {
    schema
})
