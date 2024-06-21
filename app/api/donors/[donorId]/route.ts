import { getDonor } from "@/drizzle/queries/donors.query";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: any) {
    try {
        const donorId = params.donorId;
        const donorInfo = await getDonor(donorId);
        return NextResponse.json(
            {donor: donorInfo},
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}