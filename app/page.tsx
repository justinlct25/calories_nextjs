import Image from "next/image";
import { getAccounts } from "@/drizzle/queries/auth-accounts.query"
import Link from 'next/link'
import { buttonVariants } from "@/components/ui/button";
import User from '@/components/User';
import { auth } from "@/lib/auth";


export default async function Home() {
  // const data = await getAccounts();
  const session = await auth();

  return (
    <div>
      {/* <div>Accounts: {JSON.stringify(data)}</div> */}
      <h1 className='text-4xl'>Home</h1>
      <Link className={buttonVariants()} href='/admin'>Open My Admin</Link>
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </div>
  );
}
 