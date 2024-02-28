import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer
  } from "drizzle-orm/pg-core"
  

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("string"),
  image: text("image"),
})

