import { NextResponse } from "next/server";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { auth } from "@/lib/auth";
import { updateActivity } from "@/drizzle/queries/activities.query";


export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user.id || !session?.user.email){
            console.log("invalid session")
            return NextResponse.json({message: "Invalid session."}, {status: 409})
        }
        if (await isAdminRole(session?.user.id)) {
            const body = await req.json();
            try {
                await updateActivity(body.activityId, body.update);
                return NextResponse.json(
                    { message: "Activity updated successfully"},
                    { status: 500 }
                )
            } catch(error:any) {
                return NextResponse.json(
                    { message: error.message},
                    { status: 500 }
                )
            }
        } else {
            return NextResponse.json(
                { message: "User not an admin"},
                { status: 409 }
            )
        }
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}