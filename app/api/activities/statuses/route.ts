import { getAllActivityStatuses } from "@/drizzle/queries/activity-status.query";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const activityStatuses = await getAllActivityStatuses();
        return NextResponse.json(activityStatuses, {status: 200})
    } catch (error) {
        return NextResponse.json({message: `${error}`}, {status: 500})
    }
}