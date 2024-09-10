import { db } from "@/lib/db"
import { donorsToActivities } from "../schemas/donors-to-activities.schema"
import { and, eq } from "drizzle-orm"
import { NewParticipantInfo, insertParticipantInfo } from "./participant-info.query"

export const findAllParticipants = async (activityId: number, withParticipantInfo: boolean) => {
    try {
        let participants: any;
        if (withParticipantInfo) {
            participants = await db.query.donorsToActivities.findMany({
                where: (donorsToActivities, { eq }) => eq(donorsToActivities.activityId, activityId),
                with: {
                    participant: true,
                    donor: true
                }
            })
        } else {
            participants = await db.query.donorsToActivities.findMany({
                where: (donorsToActivities, { eq }) => eq(donorsToActivities.activityId, activityId), 
                with: {
                    donor: {
                        columns: {
                            userId: false,
                            username: false,
                            firstname: false,
                            lastname: false,
                            phone: false,
                            weight: false,
                            birth: false,
                            createdAt: false,
                        }
                    }
                }
            })
        }
        return participants;
    } catch (e) {
        console.log(e);
    }
    return "Error";
}

export const findNumberOfParticipants = async (activityId: number) => {
    const participants = await db.query.donorsToActivities.findMany({
        where: (donorsToActivities, { eq }) => eq(donorsToActivities.activityId, activityId)
    })
    if (!participants) {
        return 0;
    }
    return participants.length;
}

export const findParticipant = async (donorId: number, activityId: number) => {
    if (donorId && activityId) {
        const participant = await db.query.donorsToActivities.findFirst({
            where: (donorsToActivities, { and, eq }) => and(
                eq(donorsToActivities.donorId, donorId),
                eq(donorsToActivities.activityId, activityId)
            )
        })
        return participant;
    } else {
        return null;
    }
}

export const participate = async (donorId: number, activityId: number, participantInfo: NewParticipantInfo) => {
    const newParticipantInfo = await insertParticipantInfo(participantInfo);
    const newParticipation = await db.insert(donorsToActivities).values({
        donorId: donorId,
        activityId: activityId,
        participantInfoId: newParticipantInfo.id,
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