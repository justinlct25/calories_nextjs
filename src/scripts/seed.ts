import { NewAccount, insertAccount } from "@/src/drizzle/queries/accounts.query";

async function main() {
    const newAccount: NewAccount = {
        username: "Justin",
        email: "justin@gmail.com",
        password: "justin"
    };
    const res = await insertAccount(newAccount);
    console.log("insert account success", res);
    process.exit();
}

main()