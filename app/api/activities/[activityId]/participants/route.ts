import { findAllParticipants, findNumberOfParticipants, findParticipant, participate, quit } from "@/drizzle/queries/donors-to-activities.query";
import { getUser } from "@/drizzle/queries/users.query";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";


export async function GET(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const user = (await getUser(session?.user.id))
        if (!user) { return NextResponse.json({message: "User not found"}, {status: 404}) }
        const isAdmin = await isAdminRole(user.id);
        const participants = await findAllParticipants(activityId, isAdmin ? true: false);
        return NextResponse.json(
            {
                participants: participants
            },
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}