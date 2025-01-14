import { auth } from "@/lib/auth";
import { getAllBriefActivities } from "@/drizzle/queries/activities.query"
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const session = await auth();
        let isAdmin = false;
        if (session?.user.id) {
            isAdmin = await isAdminRole(session?.user.id);
        }
        const activities = await getAllBriefActivities(isAdmin);
        if (activities) {
            return NextResponse.json(
                {activities: activities, message: "Activities obtained"},
                {status: 200}
            )
        }
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}