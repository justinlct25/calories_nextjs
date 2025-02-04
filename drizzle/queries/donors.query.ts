import { db } from "@/lib/db"
import { donors } from "../schemas/donors.schema"
import { eq } from "drizzle-orm"

export const getDonor = async (donorId: number) => {
    const donorInfo = await db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.id, donorId),
        with: {
            activities: {
                with: {
                    activity: {
                        columns: {
                            description: false
                        },
                        with: {
                            status: true,
                            participants: {
                                where: (donorsToActivities: any, { eq }: any) => eq(donorsToActivities.donorId, donorId),
                                with: {
                                    attendanceRecord: {
                                        with: {
                                            attendanceStatus: true
                                        }
                                    }
                                }
                            }
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
                }
            }
        }
    })
    return donorInfo;
}

export const getDonorByName = async (username: string) => {
    const donorInfo = await db.query.donors.findFirst({
        where: (donors, { eq }) => eq(donors.username, username)
    })
    return donorInfo;
}

export const updateDonor = async (donorId: number, updateObj: any) => {
    try {
        await db.update(donors).set(updateObj).where(eq(donors.id, donorId));
    } catch(error) {
        throw new Error(`${error}`)
    }
}


