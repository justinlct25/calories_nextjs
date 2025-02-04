import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { findNumberOfParticipants, findParticipant, participate, quit } from "@/drizzle/queries/donors-to-activities.query";
import { getUser } from "@/drizzle/queries/users.query";

import { Donor } from "@/drizzle/schemas/donors.schema";

export async function GET(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const user = (await getUser(session?.user.id))
        const donorInfo = user?.donor as Donor;
        if (!user) { return NextResponse.json({message: "User not found"}, {status: 404}) }
        const donorId = Number(params.donorId);
        if (user?.donor && donorId !== donorInfo.id ) { return NextResponse.json({message: "Target donor not user's donor profile"}, {status: 404}) }
        const participation = await findParticipant(donorId, activityId);
        const numOfParticipants = await findNumberOfParticipants(activityId);
        return NextResponse.json(
            {
                participation: participation,
                numOfParticipants: numOfParticipants
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

// donor participate in an activity
export async function POST(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const user = (await getUser(session?.user.id))
        if (!user?.donor) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const donorInfo = user.donor as Donor;
        const donorId = Number(params.donorId);
        if (donorId !== donorInfo.id ) { return NextResponse.json({message: "Cannot participate activity with donor profile not owned by user"}, {status: 404}) }
        if (!donorInfo.firstname || !donorInfo.lastname || !donorInfo.phone || !donorInfo.weight || !donorInfo.birth) {
            return NextResponse.json(
                {message: "Please fill in your personal information first"},
                {status: 409}
            )
        }
        const participantInfo = {
            firstname: donorInfo.firstname,
            lastname: donorInfo.lastname,
            phone: donorInfo.phone,
            weight: Number(donorInfo.weight),
            birth: donorInfo.birth,
            email: user.email,
        }
        const newParticipation = await participate(donorId, activityId, participantInfo);
        return NextResponse.json(
            {success: true, participation: newParticipation, message: "Joined activity successfully"},
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

export async function DELETE(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const user = (await getUser(session?.user.id))
        if (!user?.donor) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const donorInfo = user.donor as Donor;
        const donorId = Number(params.donorId);
        if (donorId !== donorInfo.id ) { return NextResponse.json({message: "Cannot quit activity with donor profile not owned by user"}, {status: 404}) }
        const quitSuccessfully = await quit(donorId, activityId);
        if (quitSuccessfully) {
            return NextResponse.json(
                {success: true, message: "Quit activity successfully"},
                {status: 200}
            )
        } else {
            return NextResponse.json(
                {success: false, message: "Something went wrong"},
                {status: 500}
            )
        }
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}