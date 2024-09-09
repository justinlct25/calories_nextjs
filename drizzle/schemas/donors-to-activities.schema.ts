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
import { participantInfo } from "./participant-info.schema"


export const donorsToActivities: any = pgTable('donors_to_activities', {
    donorId: integer('donor_id').notNull().references(() => donors.id),
    activityId: integer('activity_id').notNull().references(() => activities.id),
    participantInfoId: integer('participant_info_id').notNull().references(() => participantInfo.id),
    createdAt: timestamp('created_at').defaultNow().notNull()
});
// }, (t) => ({
//     pk: primaryKey(t.donorId, t.activityId)
// }))

export const donorsToActivitiesRelations = relations(donorsToActivities, ({ one }) => ({
    donor: one(donors, {
        fields: [donorsToActivities.donorId],
        references: [donors.id]
    }),
    activity: one(activities, {
        fields: [donorsToActivities.activityId],
        references: [activities.id]
    }),
    participant: one(participantInfo, {
        fields: [donorsToActivities.participantInfoId],
        references: [participantInfo.id]
    })
}))
