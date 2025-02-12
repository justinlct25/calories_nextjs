// import Image from "next/image";
// import { getAccounts } from "@/drizzle/queries/auth-accounts.query"
// import Link from 'next/link'
// import { buttonVariants } from "@/components/ui/button";
// import User from '@/components/User';
// import { auth } from "@/lib/auth";
// import { useEffect } from "react";
// import { useRouter } from "next/router";


// export default async function Home() {
//   // const data = await getAccounts();
//   const session = await auth();
//   const router = useRouter();

//   useEffect(() => {
//     router.push('/activities');
//   }, [router]);

//   return (
//     <div>
//       {/* <div>Accounts: {JSON.stringify(data)}</div>
//       <h1 className='text-4xl'>Home</h1>
//       <Link className={buttonVariants()} href='/admin'>Open My Admin</Link>
//       <h2>Client Session</h2>
//       <User />
//       <h2>Server Session</h2>
//       {JSON.stringify(session)} */}
//     </div>
//   );
// }
 

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/activities');
  }, [router]);

  return null; // Return null since the user will be redirected
}