import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { getAttendanceRecordById, updateAttendanceRecord } from "@/drizzle/queries/attendance-record.query";

export async function POST(req: Request, {params}: any) {
    try {
        const recordId = params.recordId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        if (!(await isAdminRole(session?.user.id))) { return NextResponse.json({message: "Unauthorized"}, {status: 401}) }
        const existingRecord = await getAttendanceRecordById(recordId);
        if (!existingRecord) { return NextResponse.json({message: "Record not found"}, {status: 404}) }
        const updateObj = String(req.body);
        const newAttendanceRecord = await updateAttendanceRecord(recordId, updateObj);
        return NextResponse.json(
            {attendanceRecord: newAttendanceRecord, message: "Attendance record updated"},
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }    
}