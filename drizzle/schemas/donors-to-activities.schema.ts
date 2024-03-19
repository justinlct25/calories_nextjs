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
import { donors } from "./donors.schema"
import { activities } from "./activities.schema"


export const donorsToActivities = pgTable('donors_to_activities', {
    donorId: integer('donor_id').notNull().references(() => donors.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
}, (t) => ({
    pk: primaryKey(t.donorId, t.activityId)
}))

export const donorsToActivitiesRelations = relations(donorsToActivities, ({ one }) => ({
    role: one(donors, {
        fields: [donorsToActivities.donorId],
        references: [donors.id]
    }),
    donor: one(activities, {
        fields: [donorsToActivities.activityId],
        references: [activities.id]
    })
}))
