"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from "@/components/TopPadding";
import { Loading } from "@/components/ui/loading";
// import { useSession } from "next-auth/react"
// import { useState, useEffect } from "react";
// import { useCounterStore } from '../stores/counter-store-provider';
import { useUserStore } from "../stores/user-store-provider";
import { useState } from "react";

const ActivitiesMenuPage = () => {
  // const { data: session, status } = useSession()
  // const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // useEffect(() => {
  //     if (session) {
  //         // setUser(session.user);
  //         fetch(`/api/admin/${session?.user.id}`)
  //         .then((res) => res.json())
  //         .then((data) => setIsAdmin(data.isAdmin));
  //     }
  // }, [session])
  // const { count, incrementCount, decrementCount } = useCounterStore(
  //     (state) => state,
  //   )
  const { user, setUser } = useUserStore((state) => state);
  const [loading, setLoading]  = useState(false);

  return (
    <div className="w-full">
      <TopPadding />

      <div className="container flex items-center justify-between">
        <h2 className="text-3xl font-bold px-20">Exercises</h2>
        {user.isAdmin && 
        <Link className="px-6" href="/activities/create" onClick={() => setLoading(true)}>  {/* <Loading />  not working*/}
          <PlusCircle color="#4ade80" strokeWidth={3} />
        </Link>
        }
      </div>

      <ActivitiesSelectionPanel />

      {loading && <Loading />}
    </div>
  );
};

export default ActivitiesMenuPage;
