import { getDonorByUserId } from "@/drizzle/queries/donors.query";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: any) {
    try {
        const userId = params.userId;
        const donorInfo = await getDonorByUserId(userId);
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