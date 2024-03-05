import { db } from "@/lib/db"

// vercel database
// import { migrate } from "drizzle-orm/vercel-postgres/migrator";
// async function main() {
//     await migrate(db, { migrationsFolder: "./drizzle/migrations"});
// }

// supabase database
import { migrate } from "drizzle-orm/postgres-js/migrator";
async function main() {
    await migrate(db, { migrationsFolder: "./drizzle/migrations"});
}


main();