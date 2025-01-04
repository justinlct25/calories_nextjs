import { db } from '@/lib/db';
import { attendanceStatus } from '../schemas/attendance-status.schema';

export type AttendanceStatus = typeof attendanceStatus.$inferInsert;

export const insertAttendanceStatus = async (attendanceStatusObj: AttendanceStatus) => {
    const newAttendanceStatus = await db.insert(attendanceStatus).values(attendanceStatusObj).returning().then((res) => res[0] ?? null);
    return newAttendanceStatus;
}

export const getAllAttendanceStatuses = async () => {
    const attendanceStatuses = await db.query.attendanceStatus.findMany();
    return attendanceStatuses;
}

export const findAttendanceStatusByName = async (name: string) => {
    const attendanceStatus = await db.query.attendanceStatus.findFirst({
        where: (attendanceStatus, { eq }) => eq(attendanceStatus.name, name)
    })
    return attendanceStatus;
}