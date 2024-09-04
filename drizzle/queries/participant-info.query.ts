import { db } from "@/lib/db"
import { participantInfo } from "../schemas/participant-info.schema"


export type NewParticipantInfo = typeof participantInfo.$inferInsert;
export const insertParticipantInfo = async (participantInfoObj: NewParticipantInfo) => {
    const newParticipantInfo = await db.insert(participantInfo).values(participantInfoObj).returning().then((res) => res[0] ?? null);
    return newParticipantInfo;
}