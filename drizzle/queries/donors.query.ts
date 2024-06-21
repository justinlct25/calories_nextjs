import { db } from "@/lib/db"
import { donors } from "../schemas/donors.schema"

export const getDonor = async (donorId: number) => {
    const donorInfo = await db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.id, donorId),
        with: {
            activities: {
                with: {
                    activity: {
                        columns: {
                            description: false
                        }
                    }
                }
            }
        }
    })
    return donorInfo;
}

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


