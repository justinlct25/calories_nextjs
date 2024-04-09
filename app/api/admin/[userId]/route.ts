// import { NextApiResponse, NextApiRequest } from "next";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: any) {
    try {
        const userId = params.userId;
        const isAdmin = await isAdminRole(userId);
        return NextResponse.json({isAdmin}, {status: 401})
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}