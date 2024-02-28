import "@/lib/config"
import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
// import { accounts } from "./schemas/accounts.schema";
import * as schema from "../drizzle/schemas/_schemas";

export const db = drizzle(sql, { schema });

