import { auth } from "@/lib/auth";
import { getActivitiesList, getAllBriefActivities } from "@/drizzle/queries/activities.query"
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { NextResponse } from "next/server";
import { getUser } from "@/drizzle/queries/users.query";
import { Donor } from "@/drizzle/schemas/donors.schema";


export async function GET(req: Request) {
    try {
        const session = await auth();
        let donorId = null;
        let isAdmin = false;
        if (session?.user.id) {
            const user = await getUser(session?.user.id);
            const donorInfo = user?.donor as Donor;
            if (user?.donor) donorId = donorInfo.id;
            isAdmin = await isAdminRole(session?.user.id);
        }
        const activities = await getActivitiesList(donorId, isAdmin? true : false);
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