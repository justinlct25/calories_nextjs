import {
    pgTable,
    serial,
    text,
    timestamp,
    date,
    uniqueIndex,
    integer,
    decimal,
    primaryKey
} from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'




export const genderOptions = pgTable("genderOptions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
})