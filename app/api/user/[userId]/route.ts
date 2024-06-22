import { getUser } from "@/drizzle/queries/users.query";
import { NextResponse } from "next/server";


export async function GET(req: Request, {params}: any) {
    try {
        const userId = params.userId;
        const userInfo = await getUser(userId);
        return NextResponse.json(
            {user: userInfo},
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}