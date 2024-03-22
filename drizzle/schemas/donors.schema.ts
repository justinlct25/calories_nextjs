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
import { genderOptions } from "./gender-options.schema";
import { friends } from "./friends.schema";
import { donorsToActivities } from "./donors-to-activities.schema";



export const donors = pgTable("donor", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id),
    genderOptionId: integer("gender_option_id").references(() => genderOptions.id),
    name: text("name").notNull(),
    icon: text("icon").default("default_user.png"),
    firstname: text("firstname"),
    lastname: text("lastname"),
    phone: text("phone"),
    weight: decimal("weight"),
    birth: date("birth"),
    calories: integer("calories"),
    scores: integer("scores"),
    // country: 
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const donorsRelations = relations(donors, ({ one, many }) => ({
    user: one(users, {
        fields: [donors.userId],
        references: [users.id]
    }), // one-to-one
    gender: one(genderOptions, {
        fields: [donors.genderOptionId],
        references: [genderOptions.id],
    }),
    friends: many(friends),
    activities: many(donorsToActivities)
}));