import { getActivityById } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import * as z from 'zod';

export async function GET(req: Request, {params}: any) {
    try {
        const activityId = params.activityId
        const activity = await getActivityById(activityId);
        if (activity) {
            return NextResponse.json(
                {activity: activity, message: "Activity obtained"}, 
                {status: 200}
            )
        } else {
            return NextResponse.json(
                {message: `Activity with id ${activityId} is not found`}, 
                {status: 200}
            )
        }
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}