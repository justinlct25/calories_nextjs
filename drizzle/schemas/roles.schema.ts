import {
    pgTable,
    serial,
    text,
} from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'
import { usersToRoles } from "./users-to-roles.schema";

export const roles = pgTable("role", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description")
});

export const rolesRelations = relations(roles, ({ many }) => ({
    accountsToRoles: many(usersToRoles),
}))
