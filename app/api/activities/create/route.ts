import { getActivityByName, updateActivity } from "@/drizzle/queries/activities.query";
import { insertActivity } from "@/drizzle/queries/activities.query";
import { NextResponse } from "next/server";
import * as z from 'zod';
import { auth } from "@/lib/auth";
// import { getSession } from "next-auth/react";
import { getUserByEmail } from "@/drizzle/queries/auth-users.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { processTipTapBase64Images } from "@/utils/tiptapImageHelper";
import { redirect } from 'next/navigation';

const activityCreateFormSchema = z.object({
    name: z.string().min(1, 'Activity name is required').max(100),
    startAt: z.string().datetime(),
    endAt: z.string().datetime(),
    quota: z.number().optional(),
    price: z.number().optional(),
    description: z.string().optional()
})

export async function POST(req: Request) {
    try {
        try {
            const session = await auth();
            if (!session?.user.id || !session?.user.email){
                console.log("invalid session")
                return NextResponse.json({message: "Invalid session."}, {status: 409})
            }
            if (await isAdminRole(session?.user.id)) {
                const body = await req.json();
                const { name, startAt, endAt, quota, price, description } = activityCreateFormSchema.parse(body);
                if (await getActivityByName(name)) {
                    console.log("Activity with this name already exists");
                    return NextResponse.json({message: "Activity with this name already exists"}, {status: 409})
                }
                const existingUser = await getUserByEmail(session?.user.email)
                const newActivity = await insertActivity({
                    creatorId: existingUser?.admin!.id,
                    name: name,
                    startAt: new Date(startAt),
                    endAt: new Date(endAt), 
                    quota: quota,
                    price: price?.toString(),
                })
                if (description) {
                    const descriptionWithUploadedImgLinks = await processTipTapBase64Images(newActivity.id, description);
                    await updateActivity(newActivity.id, {description: descriptionWithUploadedImgLinks});
                }

                return NextResponse.json(
                    {activity: newActivity, message: "Activity created successfully"}, 
                    {status: 201}
                )

            } else {
                return NextResponse.json(
                    { message: "User not an admin"},
                    { status: 409 }
                )
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

    