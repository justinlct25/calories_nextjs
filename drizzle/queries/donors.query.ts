import { db } from "@/lib/db"
import { donors } from "../schemas/donors.schema"

export const getDonorByUserId = async (userId: string) => {
    const donorInfo = db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.userId, userId)
    })
    return donorInfo;
}


