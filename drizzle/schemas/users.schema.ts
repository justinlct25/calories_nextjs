import {
    timestamp,
    pgTable,
    text,
    primaryKey,
   integer,
   serial
  } from "drizzle-orm/pg-core"
  

export const users = pgTable("user", {
  id: serial("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("string"),
  image: text("image"),
})

