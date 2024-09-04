import { pgTable, integer, text, timestamp, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { donorsToActivities } from "./donors-to-activities.schema";

export const participantInfo = pgTable("participant_info", {
    id: serial("id").primaryKey(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    phone: text("phone").notNull(),
    weight: integer("weight").notNull(),
    birth: text("birth").notNull(),
    email: text("email").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const participantInfoRelations = relations(participantInfo, ({ one }) => ({
    activities: one(donorsToActivities, {
        fields: [participantInfo.id],
        references: [donorsToActivities.participantInfoId]
    })
}));