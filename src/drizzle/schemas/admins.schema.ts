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
import { accounts } from "./accounts.schema";
import { activities } from "./activities.schema";

export const admins = pgTable("admins", {
    id: serial("id").primaryKey(),
    accountId: integer("account_id").references(() => accounts.id),
    name: text("name").notNull(),
    icon: text("icon").default("default_admin.png"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminsRelations = relations(admins, ({ one, many }) => ({
    account: one(accounts),
    createdActivities: many(activities)
}));