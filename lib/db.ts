import "@/lib/config"
import * as schema from "../drizzle/schemas/_schemas";

// vercel database
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
export const db = drizzle(sql, { schema });

// supabase database
// import { drizzle } from 'drizzle-orm/postgres-js'
// import postgres from 'postgres'
// const connectionString = process.env.DATABASE_URL!
// export const client = postgres(connectionString, { prepare: false })
// export const db = drizzle(client, { schema });



