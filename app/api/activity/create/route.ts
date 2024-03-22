import { getActivityByName } from "@/drizzle/queries/activities.query";
import { insertActivity } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import * as z from 'zod';
// import { auth } from "@/lib/auth";
import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/drizzle/queries/auth-users.query";

const activityCreateFormSchema = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number().optional(),
    price: z.number().optional()
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        try {
            const { name, startAt, endAt, quota, price } = activityCreateFormSchema.parse(body);
            if (await getActivityByName(name)) {
                return NextResponse.json(
                    {user: null, message: "Activity with this name already exists"},
                    {status: 409}
                    )
            }
            const session = await getSession();
            if (session?.user.email) {
                const existingUser = await getUserByEmail(session?.user.email)
                if (existingUser?.admin) {
                    const newActivity = await insertActivity({
                        creatorId: existingUser.admin.id,
                        name: name,
                        startAt: new Date(startAt),
                        endAt: new Date(endAt), 
                        quota: quota,
                        price: price?.toString(),
        
                    })
                    return NextResponse.json(
                        {activity: newActivity, message: "Activity created successfully"}, 
                        {status: 201}
                    )
                } else {
                    return NextResponse.json(
                        { message: "Not an admin"},
                        { status: 409 }
                    )
                }
            }
        } catch (error) {
            console.error(`Error parsing user schema: `, error);
            return NextResponse.json(
                { message: "Invalid input data"},
                { status: 400 }
            )
        }
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

    