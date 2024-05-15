import { db } from "@/lib/db"
import { donorsToActivities } from "../schemas/donors-to-activities.schema"
import { and, eq } from "drizzle-orm"

export const findParticipant = async (donorId: number, activityId: number) => {
    const participant = await db.query.donorsToActivities.findFirst({
        where: (donorsToActivities, { and, eq }) => and(
            eq(donorsToActivities.donorId, donorId),
            eq(donorsToActivities.activityId, activityId)
        )
    })
    return participant;
}

export const participate = async (donorId: number, activityId: number) => {
    const newParticipation = await db.insert(donorsToActivities).values({
        donorId: donorId,
        activityId: activityId
    }).returning().then((res) => res[0] ?? null);
    return newParticipation;
}

export const quit = async (donorId: number, activityId: number) => {
    const deletedParticipation = await db.delete(donorsToActivities).where(and(
        eq(donorsToActivities.donorId, donorId),
        eq(donorsToActivities.activityId, activityId)
    ));
    const wasSuccessful = Boolean(deletedParticipation);
    return wasSuccessful;
}