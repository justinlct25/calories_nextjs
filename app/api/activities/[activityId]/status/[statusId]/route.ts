import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { getActivityById, updateActivityStatus } from "@/drizzle/queries/activities.query";

export async function PUT(req: Request, { params }: any) {
    try {
        const activityId = params.activityId;
        const statusId = params.statusId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({ message: "Invalid session" }, { status: 409 }) }
        if (!(await isAdminRole(session?.user.id))) { return NextResponse.json({ message: "Unauthorized" }, { status: 401 }) }
        const existingActivity = await getActivityById(activityId);
        if (!existingActivity) { return NextResponse.json({ message: "Activity not found" }, { status: 404 }) }
        const newActivityStatus = await updateActivityStatus(activityId, statusId);
        return NextResponse.json(
            { activity: newActivityStatus, message: `Updated activity status.` },
            { status: 200 }
        )
    } catch (e) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        )
    }
}