import { getAllBriefActivities } from "@/drizzle/queries/activities.query"
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const activities = await getAllBriefActivities();
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