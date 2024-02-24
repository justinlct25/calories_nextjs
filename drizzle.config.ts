import "@/lib/config";
import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//     schema: "./lib/schema.ts", 
//     out: "./drizzle",
//     driver: "pg",
//     dbCredentials: {
//         connectionString: process.env.POSTGRES_URL! + "?sslmode=require"
//     }, 
//     verbose: true, 
//     strict: true
// })


export default defineConfig({
    schema: "./drizzle/schemas/*", 
    out: "./drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL! + "?sslmode=require"
    }, 
    verbose: true, 
    strict: true
})