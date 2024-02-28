import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./db";
// import { getUserByEmail } from "@/drizzle/queries/auths-users.query";
// import pgDrizzleAdapter from "@auth/drizzle-adapter"
import { getUserByEmail } from "@/drizzle/queries/auths-users.query";
import { compare } from "bcrypt";



export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "calories@mail.com"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string, password: string }
                if (!email || !password) return null;
                const existingUser = await getUserByEmail(email);
                if (!existingUser) return null;
                if (existingUser.password) {
                    const passwordMatch = await compare(password, existingUser.password);
                    if (!passwordMatch) return null;
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.name,
                    email: existingUser.email
                };
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            return session;
        },
    },
})