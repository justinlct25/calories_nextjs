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
import { roles } from "./roles.schema"
import { users } from "./users.schema"

export const usersToRoles = pgTable('users_to_roles', {
    userId: integer('user_id').notNull().references(() => users.id),
    roleId: integer('role_id').notNull().references(() => roles.id),
}, (t) => ({
    pk: primaryKey(t.userId, t.roleId)
}))

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
    role: one(roles, {
        fields: [usersToRoles.roleId],
        references: [roles.id]
    }),
    user: one(users, {
        fields: [usersToRoles.userId],
        references: [users.id]
    })
}))
