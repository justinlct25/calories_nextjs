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


export const accounts = pgTable("accounts", {
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
export const accountsRelations = relations(accounts, ({ many }) => ({
    roles: many(accountsToRoles),
}));

