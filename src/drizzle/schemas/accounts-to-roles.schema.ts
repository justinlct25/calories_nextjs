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
import { accounts } from "./accounts.schema"

export const accountsToRoles = pgTable('accounts_to_roles', {
    accountId: integer('account_id').notNull().references(() => accounts.id),
    roleId: integer('role_id').notNull().references(() => roles.id),
}, (t) => ({
    pk: primaryKey(t.accountId, t.roleId)
}))

export const accountsToRolesRelations = relations(accountsToRoles, ({ one }) => ({
    role: one(roles, {
        fields: [accountsToRoles.roleId],
        references: [roles.id]
    }),
    user: one(accounts, {
        fields: [accountsToRoles.accountId],
        references: [accounts.id]
    })
}))
