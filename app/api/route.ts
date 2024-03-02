import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const session = auth();
    return NextResponse.json({ authenticated: !!session})
}