import { db } from "@/lib/db"
import { usersToRoles } from "../schemas/users-to-roles.schema"

// export const getUserRolesWithId = async (userId: number) => {
//     const roles = db.query.usersToRoles
// }

export const editUserRolesRelation = async (userId: number, role: string) => {
    // const roleId = 
}