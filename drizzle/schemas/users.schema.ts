import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer
  } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'
import { roles } from "./roles.schema"
import { admins } from "./admins.schema"
import { donors } from "./donors.schema"
import { usersToRoles } from "./users-to-roles.schema"
  

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("string"),
  image: text("image"),
})


export const usersRelations = relations(users, ({ one, many }) => ({
  roles: many(usersToRoles),
  admin: one(admins),
  donor: one(donors)
}));

