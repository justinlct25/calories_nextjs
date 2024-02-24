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
import { users } from "./users.schema"
import { activities } from "./activities.schema"


export const usersToActivities = pgTable('users_to_activities', {
    userId: integer('user_id').notNull().references(() => users.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
}, (t) => ({
    pk: primaryKey(t.userId, t.activityId)
}))

export const usersToActivitiesRelations = relations(usersToActivities, ({ one }) => ({
    role: one(users, {
        fields: [usersToActivities.userId],
        references: [users.id]
    }),
    user: one(activities, {
        fields: [usersToActivities.activityId],
        references: [activities.id]
    })
}))
