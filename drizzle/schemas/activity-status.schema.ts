import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core"
import { relations } from 'drizzle-orm'
import { activities } from "./activities.schema"


export const activityStatus = pgTable("activity_status", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const activityStatusRelations = relations(activityStatus, ({ many }) => ({
    activities: many(activities)
}))