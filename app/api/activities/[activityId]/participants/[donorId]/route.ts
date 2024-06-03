import { findNumberOfParticipants, findParticipant, participate, quit } from "@/drizzle/queries/donors-to-activities.query";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: any) {
    try {
        const activityId = params.activityId;
        const donorId = params.donorId;
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
        const donorId = params.donorId;
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
        const donorId = params.donorId;
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