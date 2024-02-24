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
import { users } from "./users.schema";



export const friends = pgTable("friends", {
    user1Id: integer("user_1_id").references(() => users.id),
    user2Id: integer("user_2_id").references(() => users.id)
}, (t) => ({
    pk: primaryKey(t.user1Id, t.user2Id)
}));


export const friendsRelations = relations(friends, ({ one }) => ({
    user1: one(users, {
      fields: [friends.user1Id],
      references: [users.id],
    }),
    user2: one(users, {
      fields: [friends.user2Id],
      references: [users.id],
    }),
  }));