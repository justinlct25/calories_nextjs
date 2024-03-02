import "@/lib/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./drizzle/schemas/*", 
    out: "./drizzle/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL! + "?sslmode=require"
        // connectionString: "postgres://postgres.qqyapjntiuxycxondhes:Foodsport101!@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
    }, 
    verbose: true, 
    strict: true
})