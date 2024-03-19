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
import { users } from "./users.schema";
import { activities } from "./activities.schema";

export const admins = pgTable("admin", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id),
    name: text("name").notNull(),
    icon: text("icon").default("default_admin.png"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminsRelations = relations(admins, ({ one, many }) => ({
    user: one(users),
    createdActivities: many(activities)
}));