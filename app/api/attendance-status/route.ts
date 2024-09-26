import { getAllAttendanceStatuses } from "@/drizzle/queries/attendance-status.query";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const attendanceStatuses = await getAllAttendanceStatuses();
        return NextResponse.json(attendanceStatuses, {status: 200})
    } catch (error) {
        return NextResponse.json({message: `${error}`}, {status: 500})
    }
}