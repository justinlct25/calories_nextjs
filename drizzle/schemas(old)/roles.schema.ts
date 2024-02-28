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
import { accountsToRoles } from "./accounts-to-roles.schema";

export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description")
});

export const rolesRelations = relations(roles, ({ many }) => ({
    accountsToRoles: many(accountsToRoles),
}))
