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
import { genderOptions } from "./gender-options.schema";
import { friends } from "./friends.schema";
import { usersToActivities } from "./users-to-activities.schema";



export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    accountId: integer("account_id").references(() => accounts.id),
    genderOptionId: integer("gender_option_id").references(() => genderOptions.id),
    name: text("name").notNull(),
    icon: text("icon").default("default_user.png"),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    phone: text("phone"),
    weight: decimal("weight"),
    birth: date("birth"),
    calories: integer("calories"),
    scores: integer("scores"),
    // country: 
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    account: one(accounts), // one-to-one
    gender: one(genderOptions, {
        fields: [users.genderOptionId],
        references: [genderOptions.id],
    }),
    friends: many(friends),
    activities: many(usersToActivities)
}));