import { pgTable, integer, text, timestamp, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { attendanceStatus } from "./attendance-status.schema";
import { donorsToActivities } from "./donors-to-activities.schema";

export const attendanceRecord = pgTable("attendance_record", {
    id: serial("id").primaryKey(),
    statusId: integer('status_id').notNull().references(() => attendanceStatus.id),
    record: text("record"),
    calories: integer("calories"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const attendanceRecordRelations = relations(attendanceRecord, ({ one }) => ({
    participation: one(donorsToActivities),
    attendanceStatus: one(attendanceStatus, {
        fields: [attendanceRecord.statusId],
        references: [attendanceStatus.id]
    })
}));