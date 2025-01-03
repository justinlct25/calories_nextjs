import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { getActivityById, updateActivityPublicity } from "@/drizzle/queries/activities.query";
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
            if (targetActivity.public == false) {
                return NextResponse.json(
                    {message: "Activity is already locked."},
                    {status: 200}
                )
            } else {
                await updateActivityPublicity(activityId, false);
                return NextResponse.json(
                    {isPublic: false, message: "Activity is now locked."},
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