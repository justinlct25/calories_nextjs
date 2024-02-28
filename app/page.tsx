import Image from "next/image";
import { getAccounts } from "@/drizzle/queries/auth-accounts.query"

export default async function Home() {
  const data = await getAccounts();

  return (
    <div>
      <div>Accounts: {JSON.stringify(data)}</div>
    </div>
  );
}
 