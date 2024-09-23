import { db } from '@/lib/db';
import { attendanceRecord } from '../schemas/attendance-record.schema';

export type NewAttendanceRecord = typeof attendanceRecord.$inferInsert;
export const insertAttendanceRecord = async (attendanceRecordObj: NewAttendanceRecord) => {
    // try {
        const newAttendanceRecord = await db.insert(attendanceRecord).values(attendanceRecordObj).returning().then((res) => res[0] ?? null);
        return newAttendanceRecord;
    // } catch(e) {
    //     console.log(e);
    // }
}