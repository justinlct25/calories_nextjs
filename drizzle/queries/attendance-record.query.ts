import { db } from '@/lib/db';
import { attendanceRecord } from '../schemas/attendance-record.schema';
import { and, eq } from "drizzle-orm"


export type NewAttendanceRecord = typeof attendanceRecord.$inferInsert;
export const insertAttendanceRecord = async (attendanceRecordObj: NewAttendanceRecord) => {
    // try {
        const newAttendanceRecord = await db.insert(attendanceRecord).values(attendanceRecordObj).returning().then((res) => res[0] ?? null);
        return newAttendanceRecord;
    // } catch(e) {
    //     console.log(e);
    // }
}

export const getAttendanceRecordById = async (recordId: number) => {
    const attendanceRecord = await db.query.attendanceRecord.findFirst({
        where: (attendanceRecord, { eq }) => eq(attendanceRecord.id, recordId)
    })
    return attendanceRecord;
}

export const updateAttendanceRecord = async (recordId: number, updateObj: any) => {
    const updatedAttendanceRecord = await db.update(attendanceRecord).set(updateObj).where(eq(attendanceRecord.id, recordId)).returning().then((res) => res[0] ?? null);
    return updatedAttendanceRecord;
}
