// import { time } from "console";
// import {
//     pgTable,
//     serial,
//     text,
//     timestamp,
//     date,
//     uniqueIndex,
//     integer,
//     decimal,
//     primaryKey
// } from "drizzle-orm/pg-core"
// import { relations } from 'drizzle-orm'

// export const accounts = pgTable("accounts", {
//   id: serial("id").primaryKey(),
// //   username: text("username").notNull(),
//   email: text("email").notNull(),
//   password: text("password").notNull(),
//   createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// export const accountsRelations = relations(accounts, ({ many }) => ({
//     roles: many(accountsToRoles),
// }));

// export const roles = pgTable("roles", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     description: text("description")
// });

// export const rolesRelations = relations(roles, ({ many }) => ({
//     accountsToRoles: many(accountsToRoles),
// }))

// export const accountsToRoles = pgTable('accounts_to_roles', {
//     accountId: integer('account_id').notNull().references(() => accounts.id),
//     roleId: integer('role_id').notNull().references(() => roles.id),
// }, (t) => ({
//     pk: primaryKey(t.accountId, t.roleId)
// }))

// export const accountsToRolesRelations = relations(accountsToRoles, ({ one }) => ({
//     role: one(roles, {
//         fields: [accountsToRoles.roleId],
//         references: [roles.id]
//     }),
//     user: one(accounts, {
//         fields: [accountsToRoles.accountId],
//         references: [accounts.id]
//     })
// }))

// export const admins = pgTable("admins", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     icon: text("icon").default("default_admin.png"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// export const users = pgTable("users", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     icon: text("icon").default("default_user.png"),
//     firstname: text("firstname").notNull(),
//     lastname: text("lastname").notNull(),
//     phone: text("phone"),
//     weight: decimal("weight"),
//     // gender: 
//     birth: date("birth"),
//     calories: integer("calories"),
//     scores: integer("scores"),
//     // country: 
//     createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// export const usersRelations = relations(users, ({ one }) => ({
//     roles: one(accountsToRoles),
// }));

// // export const genderOptions = pgTable("genderOptions", {
// //     id
// // })

// export const activities = pgTable("activities", {
//     id: serial("id").primaryKey(),
//     name: text("name").notNull(),
//     startAt: timestamp("start_at"),
//     endAt: timestamp("end_at"),
//     quota: integer("quota"),
//     price: decimal("price"),
//     // location
//     // description: editable
//     createdAt: timestamp("created_at").defaultNow().notNull(),
// });

// // export const roles = pgTable("roles", {
// //   id: serial("id").unique(),
// //   name: text("name"),
// //   accountId: integer("account_Id").references(() => account.id)
// // });