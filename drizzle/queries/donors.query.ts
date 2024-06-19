import { db } from "@/lib/db"
import { donors } from "../schemas/donors.schema"

export const getDonorByUserId = async (userId: string) => {
    console.log("on09")
    const donorInfo = await db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.userId, userId),
        with: {
            activities: {
                with: {
                    activity: true
                }
            }
        }
        // with: {
        //     activities: true
        // }
    })
    console.log("aoejfaefnoj")
    console.log(donorInfo)
    return donorInfo;
}


