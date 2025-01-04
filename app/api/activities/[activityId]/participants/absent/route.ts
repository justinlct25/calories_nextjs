import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { informAbsent } from "@/drizzle/queries/donors-to-activities.query";
import { getUser } from "@/drizzle/queries/users.query";

export async function POST(req: Request, { params }: any) {
    try {
        const activityId = params.activityId;
        const session = await auth();
        if (!session?.user.id) {
            return NextResponse.json({ message: "Invalid session" }, { status: 409 });
        }
        const user = await getUser(session?.user.id);
        if (!user?.donor) {
            return NextResponse.json({ message: "Donor not found" }, { status: 404 });
        }
        const donorInfo = user.donor;
        const donorId = Number(params.donorId);
        if (donorId !== donorInfo.id) {
            return NextResponse.json({ message: "Cannot mark absent with donor profile not owned by user" }, { status: 404 });
        }
        const { reason } = await req.json();
        const absentSuccessfully = await informAbsent(donorId, activityId, reason);
        if (absentSuccessfully) {
            return NextResponse.json(
                { success: true, message: "Marked as absent successfully" },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: "Something went wrong" },
                { status: 500 }
            );
        }
    } catch (e) {
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}