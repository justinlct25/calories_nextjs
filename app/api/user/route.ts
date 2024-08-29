import { getUserByEmail, insertUser } from "@/drizzle/queries/auth-users.query";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod';
import { auth } from "@/lib/auth"
import { getUserDetailed } from "@/drizzle/queries/users.query";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";


// Define a schema for input validation
const userSignUpFormSchema = z.object({
    name: z.string().min(1, "Username is required").max(30),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(8, 'Password must have more than 8 characters'),
})

export async function POST(req: Request) {
    try {
        const body = await req.json();
        try {
            const { email, name, password } = userSignUpFormSchema.parse(body);
            if (await getUserByEmail(email)) {
                return NextResponse.json(
                    {user: null, message: "User with this email already exists"},
                    {status: 409}
                )
            }
            const hashedPassword = await hash(password, 10);
            const newUser = await insertUser({
                email: email,
                name: name,
                password: hashedPassword,
            })
            if (!newUser) return NextResponse.json({user: null, message: "Duplicate role or email"}, {status: 409})
            const { password: newUserPassword, ...rest } = newUser;
            return NextResponse.json(
                {user: newUser, message: "User created successfully"}, 
                {status: 201}
            )
        } catch (error) {
            console.error(`Error parsing user schema: `, error);
            return NextResponse.json(
                { message: "Invalid input data"},
                { status: 400 }
            )
        }
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session) {
            return Response.json({ message: "unauthenticated "}, { status: 401});
        }
        let userInfo = await getUserDetailed(session?.user.id);
        if (!userInfo) {
            return NextResponse.json({message: "User not found"}, {status: 404})
        }
        const isAdmin = await isAdminRole(session?.user.id);
        userInfo = { ...userInfo, isAdmin: isAdmin }
        return NextResponse.json(
            {user: userInfo},
            {status: 200}
        )
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}