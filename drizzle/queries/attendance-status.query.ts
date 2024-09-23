import { db } from '@/lib/db';
import { attendanceStatus } from '../schemas/attendance-status.schema';

export type NewAttendanceStatus = typeof attendanceStatus.$inferInsert;
export const insertAttendanceStatus = async (attendanceStatusObj: NewAttendanceStatus) => {
    const newAttendanceStatus = await db.insert(attendanceStatus).values(attendanceStatusObj).returning().then((res) => res[0] ?? null);
    return newAttendanceStatus;
}