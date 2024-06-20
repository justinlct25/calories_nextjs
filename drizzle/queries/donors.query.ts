import { db } from "@/lib/db"
import { donors } from "../schemas/donors.schema"

export const getDonorByUserId = async (userId: string) => {
    const donorInfo = await db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.userId, userId),
        with: {
            activities: {
                with: {
                    activity: {
                        columns: {
                            description: false
                        }
                    }
                    // activity: true
                }
            }
        }
    })
    return donorInfo;
}


