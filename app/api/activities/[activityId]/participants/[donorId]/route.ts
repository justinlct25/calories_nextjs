import { findNumberOfParticipants, findParticipant, participate, quit } from "@/drizzle/queries/donors-to-activities.query";
import { getUser } from "@/drizzle/queries/users.query";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        // const donorId = params.donorId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const donorInfo = (await getUser(session?.user.id))
        if (!donorInfo) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const donorId = donorInfo?.donor?.id
        if (!donorId) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const participation = await findParticipant(donorId, activityId);
        // console.log("participation" + participation);
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

export async function POST(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        // const donorId = params.donorId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const donorInfo = (await getUser(session?.user.id))
        if (!donorInfo) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const donorId = donorInfo?.donor?.id
        if (!donorId) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const newParticipation = await participate(donorId, activityId);
        return NextResponse.json(
            {participation: newParticipation, message: "Participant added"},
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
        // const donorId = params.donorId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        const donorInfo = (await getUser(session?.user.id))
        if (!donorInfo) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
        const donorId = donorInfo?.donor?.id
        if (!donorId) { return NextResponse.json({message: "Donor not found"}, {status: 404}) }
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