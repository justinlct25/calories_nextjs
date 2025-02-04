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
import { genderOptions } from "./gender-options.schema";
import { friends } from "./friends.schema";
import { donorsToActivities } from "./donors-to-activities.schema";



export const donors = pgTable("donor", {
    id: serial("id").primaryKey(),
    userId: text("user_id").references(() => users.id),
    genderOptionId: integer("gender_option_id").references(() => genderOptions.id),
    username: text("username").notNull(),
    icon: text("icon").default("default_donor_icon.png"),
    background: text("background").default("default_donor_bg.jpg"),
    firstname: text("firstname"),
    lastname: text("lastname"),
    phone: text("phone"),
    weight: decimal("weight"),
    birth: date("birth"),
    calories: integer("calories").default(0),
    levels: integer("levels").default(1),
    scores: integer("scores").default(0),
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

export type Donor = InferSelectModel<typeof donors>;