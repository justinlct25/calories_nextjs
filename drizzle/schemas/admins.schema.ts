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
import { InferSelectModel, relations } from 'drizzle-orm'
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
    user: one(users, {
        fields: [admins.userId],
        references: [users.id]
    }),
    createdActivities: many(activities)
}));

export type Admin = InferSelectModel<typeof admins>;