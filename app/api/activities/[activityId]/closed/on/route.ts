import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getActivityById, updateActivityClosed } from "@/drizzle/queries/activities.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";


export async function POST(req: Request, {params}: any) {
    try {
        const session = await auth();
        if (!session?.user.id || !session?.user.email){
            console.log("invalid session")
            return NextResponse.json({message: "Invalid session."}, {status: 409})
        }
        const activityId = params.activityId;
        const targetActivity = await getActivityById(activityId);
        if (!targetActivity) {
            console.log("Activity not found")
            return NextResponse.json({message: "Activity not found."}, {status: 404})
        }
        if (await isAdminRole(session?.user.id)) {
            if (targetActivity.closed == true) {
                return NextResponse.json(
                    {message: "Activity is already closed for application."},
                    {status: 200}
                )
            } else {
                await updateActivityClosed(activityId, true);
                return NextResponse.json(
                    {closed: true, message: "Activity is now closed for application."},
                    {status: 200}
                )
            }
        } else {
            return NextResponse.json({message: "Permission denied."}, {status: 403})
        }


    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}