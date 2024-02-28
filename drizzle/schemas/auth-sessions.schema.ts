import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer
  } from "drizzle-orm/pg-core"
import { users } from "./users.schema"


export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  })