import { db } from "@/lib/db"
import { donorsToActivities } from "../schemas/donors-to-activities.schema"
import { and, eq } from "drizzle-orm"
import { NewParticipantInfo, insertParticipantInfo } from "./participant-info.query"
import { deleteAttendanceRecord, insertAttendanceRecord, updateAttendanceRecord } from "./attendance-record.query"
import { attendanceRecord } from "../schemas/attendance-record.schema"
import { findAttendanceStatusByName } from "./attendance-status.query"

export const findAllParticipants = async (activityId: number, withParticipantInfo: boolean) => {
    try {
        let participants: any;
        if (withParticipantInfo) {
            participants = await db.query.donorsToActivities.findMany({
                where: (donorsToActivities, { eq }) => eq(donorsToActivities.activityId, activityId),
                with: {
                    donor: true,
                    participantInfo: true,
                    attendanceRecord: {
                        with: {
                            attendanceStatus: true
                        }
                    }
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
            ),
            with: {
                attendanceRecord: {
                    with: {
                        attendanceStatus: true
                    }
                }
            }
        })
        return participant;
    } else {
        return null;
    }
}

export const participate = async (donorId: number, activityId: number, participantInfo: NewParticipantInfo) => {
    const newParticipantInfo = await insertParticipantInfo(participantInfo);
    const newAttendanceRecord = await insertAttendanceRecord({
        statusId: 1,
    });
    const newParticipation = await db.insert(donorsToActivities).values({
        donorId: donorId,
        activityId: activityId,
        participantInfoId: newParticipantInfo.id,
        attendanceRecordId: newAttendanceRecord.id
    }).returning()
    .then((res) => Array.isArray(res) ? res[0] ?? null : null);
    return newParticipation;
}

export const informAbsent = async (donorId: number, activityId: number, reason?: string) => {
    const participant = await db.query.donorsToActivities.findFirst({
        where: (donorsToActivities, { and, eq }) => and(
            eq(donorsToActivities.donorId, donorId),
            eq(donorsToActivities.activityId, activityId)
        ),
        with: {
            attendanceRecord: true
        }
    });
    const absentStatus = await findAttendanceStatusByName("Absent (informed)");
    if (participant && absentStatus) {
        const updateObj: any = {
            statusId: absentStatus.id,
        };
        if (reason) updateObj.absentReason = reason;
        const updated = await updateAttendanceRecord(participant.attendanceRecordId, updateObj);
        return updated;
    }
    return false;
}

export const quit = async (donorId: number, activityId: number) => {
    const participant = await findParticipant(donorId, activityId);
    if (!participant) return false;
    const deletedParticipation = await db.delete(donorsToActivities).where(and(
        eq(donorsToActivities.donorId, donorId),
        eq(donorsToActivities.activityId, activityId)
    ));
    await deleteAttendanceRecord(participant.attendanceRecordId);
    const wasSuccessful = Boolean(deletedParticipation);
    return wasSuccessful;
}