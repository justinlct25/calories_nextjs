import { pgTable, integer, text, timestamp, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const attendanceStatus = pgTable("attendance_status", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// export const participantInfoRelations = relations(attendanceStatus, ({ one }) => ({
//     participation: one(donorsToActivities)
// }));