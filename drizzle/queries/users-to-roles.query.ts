import { db } from "@/lib/db"
import { usersToRoles } from "../schemas/users-to-roles.schema"
import { ROLE_NAMES } from "@/utils/configVariables"

// export const getUserRolesWithId = async (userId: number) => {
//     const roles = db.query.usersToRoles
// }

export const editUserRolesRelation = async (userId: number, role: string) => {
    // const roleId = 
}

export const isAdminRole = async (userId: string) => {
    const isAdmin = await db.transaction(async (tx) => {
        const userRoles = await db.query.usersToRoles.findMany({
            where: (usersToRoles, { eq }) => eq(usersToRoles.userId, userId)
        })
        const adminRoleId = await (await db.query.roles.findFirst({
            where: (roles, { eq }) => eq(roles.name, ROLE_NAMES.ADMIN)
        }))?.id
        return userRoles.some(userRole => userRole.roleId === adminRoleId)
    })
    return isAdmin;
}