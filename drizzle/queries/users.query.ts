import { db } from "@/lib/db"

export const getUser = async (userId: string) => {
    const userInfo = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.id, userId),
        columns: {
            password: false
        }, 
        with: {
            donor: true
        }
    })
    return userInfo;
}