// import "@/lib/config"
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { sql } from "@vercel/postgres";
// import { accounts } from "./schema";
// import * as schema from "./schema";

// export const db = drizzle(sql, { schema });

// export const getAccounts = async () => {
//     const result = await db.select().from(accounts); // sql-like style
//     // const result = await db.query.accounts.findMany(); // ORM relational style
//     console.log("Results", result);
//     return result;
// };

// export type NewAccount = typeof accounts.$inferInsert;

// export const insertAccount = async (account: NewAccount) => {
//     return db.insert(accounts).values(account).returning();
// }
 