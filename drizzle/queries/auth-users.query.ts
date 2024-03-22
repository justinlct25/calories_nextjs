import { db } from "@/lib/db";
import { users } from "../schemas/users.schema";
import { usersToRoles } from "../schemas/users-to-roles.schema";
import { roles } from "../schemas/roles.schema";
import { ROLE_NAMES } from "@/utils/configVariables";
import { admins } from "../schemas/admins.schema";
import { donors } from "../schemas/donors.schema";


export const getUserByEmail = async (email: string) => {
    // return drizzleAdapter.getUserByEmail?.(email);
    const user = db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, email),
        with: {
            roles: true,
            admin: true,
            donor: true
        }
    })
    return user;
}

export const getUsersByUsername = async (name: string) => {
    const users = db.query.users.findMany({
        where: (users, { eq }) => eq(users.name, name),
        with: {
            roles: true,
            admin: true,
            donor: true
        }
    })
    return users;
}

export type NewUser = typeof users.$inferInsert;
export type NewUserWithoutId = Omit<NewUser, 'id'>

export const insertUser = async (user: NewUserWithoutId, roleName: string = ROLE_NAMES.DONOR) => {
    try {
        const newUser = await db.transaction(async (tx) => {
            const roleId = (await db.query.roles.findFirst({where: (roles, { eq }) => eq(roles.name, roleName)}))?.id
            if (!roleId) {console.log(`Role ${roleName} is not exist`); return null;}
            const existingUser = await db.query.users.findFirst({where: (users, { eq }) => eq(users.email, user.email)})
            if (existingUser){console.log(`User with email ${user.email} already exist`); return null;}
            const newUser = await db.insert(users).values({
                ...user,
                id: crypto.randomUUID()
            }).returning().then((res) => res[0] ?? null)
            await db.insert(usersToRoles).values({userId: newUser.id, roleId: roleId});
            if (roleName == ROLE_NAMES.ADMIN) await db.insert(admins).values({ userId: newUser.id, name: newUser.name || '' }).returning().then((res) => res[0] ?? null) 
            await db.insert(donors).values({userId: newUser.id, name: newUser.name || '', }).returning().then((res) => res[0] ?? null)
            return newUser;
        })
        return newUser;
    } catch(error) {
        console.log(`Failed to insert user ${user.name}: ` + error);
        return null;
    }
}