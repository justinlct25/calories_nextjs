import { db } from "@/lib/db"
import { roles } from "../schemas/roles.schema"
import { usersToRoles } from "../schemas/users-to-roles.schema";

export const getAllRoles = async () => {
    const roles = db.query.roles.findMany()
    return roles;
}

// export const getRoleId = async (roleName: string) => {
//     const role = db.query.roles.findFirst({
//         where: (roles, { eq }) => eq(roles.name, roleName)
//     })
//     if (role && role.id) {
//         return role.id;
//     }
// }

export type NewRole = typeof roles.$inferInsert
export const insertRole = async (role: NewRole) => {
    try {
        const newRole = await db.transaction(async (tx) => {
            const roleId = (await db.query.roles.findFirst({where: (roles, { eq }) => eq(roles.name, role.name)}))?.id
            if (roleId) {
                console.log(`Role ${role.name} already exist`);
                return null;
            }
            return await db.insert(roles).values({
                ...role,
            }).returning().then((res) => res[0] ?? null);
        })
        return newRole;
    } catch(error) {
        console.log(`Failed to insert role ${role.name}: ` + error);
        return null;
    }
}

