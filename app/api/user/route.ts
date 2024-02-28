import { getUserByEmail, insertUser } from "@/drizzle/queries/auths-users.query";
import { db } from "@/lib/db"
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from 'zod';
import { userSignUpFormSchema } from "@/components/forms/SignUpForm";

// Define a schema for input validation
// const userSchema = z.object({
//     username: z.string().min(1, "Username is required").max(30),
//     email: z.string().min(1, 'Email is required').email('Invalid email'),
//     password: z
//         .string()
//         .min(1, 'Password is required')
//         .min(8, 'Password must have more than 8 characters'),
// })

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = userSignUpFormSchema.parse(body);

        if (await getUserByEmail(email)) {
            return NextResponse.json(
                {user: null, message: "User with this email already exists"},
                {status: 409}
            )
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await insertUser({
            email: email,
            username: username,
            password: hashedPassword,
        })
        const { password: newUserPassword, ...rest } = newUser;

        return NextResponse.json(
            {user: newUser, message: "User created successfully"}, 
            {status: 201}
        )
    } catch(error) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }
}