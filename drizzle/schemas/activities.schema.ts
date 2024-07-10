import {
    pgTable,
    serial,
    text,
    timestamp,
    date,
    uniqueIndex,
    integer,
    decimal,
    primaryKey,
    boolean
} from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'
import { admins } from "./admins.schema";
import { donorsToActivities } from "./donors-to-activities.schema";



export const activities = pgTable("activity", {
    id: serial("id").primaryKey(),
    creatorId: integer("creator_id").references(() => admins.id),
    name: text("name").notNull(),
    startAt: timestamp("start_at"),
    endAt: timestamp("end_at"),
    quota: integer("quota"),
    price: decimal("price"),
    description: text("description"),
    thumbnail: text("thumbnail").default("default_activity_thumbnail.jpg"),
    background: text("background").default("default_activity_bg.jpg"),
    public: boolean("public").default(true),
    closed: boolean("closed").default(false),
    online: boolean("online").default(false),
    location: text("location"),
    address: text("address"),
    calories: integer("calories"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const activitiesRelations = relations(activities, ({ one, many }) => ({
    creator: one(admins, {
        fields: [activities.creatorId],
        references: [admins.id],
    }),
    participants: many(donorsToActivities)
}))