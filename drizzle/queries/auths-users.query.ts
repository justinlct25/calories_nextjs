import { db } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter } from "@auth/core/adapters";
import { users } from "../schemas/users.schema";

// const drizzleAdapter: Adapter = DrizzleAdapter(db);

export const getUserByEmail = async (email: string) => {
    // return drizzleAdapter.getUserByEmail?.(email);
    const user = db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email)
    })
    return user;
}

export const getUsersByUsername = async (username: string) => {
    const users = db.query.users.findMany({
        where: (users, { eq }) => eq(users.username, username)
    })
    return users;
}

type NewUser = typeof users.$inferInsert;
type NewUserWithoutId = Omit<NewUser, 'id'>

export const insertUser = async (user: NewUserWithoutId) => {
    return await db.insert(users).values({
        ...user,
        id: crypto.randomUUID()
    }).returning().then((res) => res[0] ?? null);
}