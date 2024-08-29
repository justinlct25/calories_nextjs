'use client'

import Link from 'next/link';
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from '@/components/TopPadding';
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useCounterStore } from '../stores/counter-store-provider';
import { useUserStore } from '../stores/user-store-provider';


const ActivitiesMenuPage = () => {
    const { data: session, status } = useSession()
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        if (session) {
            // setUser(session.user);
            fetch(`/api/admin/${session?.user.id}`)
            .then((res) => res.json())
            .then((data) => setIsAdmin(data.isAdmin));
        }
    }, [session])
    // const { count, incrementCount, decrementCount } = useCounterStore(
    //     (state) => state,
    //   )
    const { user, setUser } = useUserStore(
        (state) => state,
    )


    return (
        <div className='w-full'>
            <TopPadding />
            
            <div className='container flex items-center justify-between'>
                <h2 className='text-3xl font-bold px-20'>Exercises</h2>
                {isAdmin && <Link href='/activities/create'><PlusCircle /></Link>}
            </div>    
            
            <ActivitiesSelectionPanel />
            {/* <div>
                Count: {count}
                <hr />
                <button type="button" onClick={() => void incrementCount()}>
                    Increment Count
                </button>
                <button type="button" onClick={() => void decrementCount()}>
                    Decrement Count
                </button>
            </div> */}
            <div>
                User: {JSON.stringify(user)}
            </div>

        </div>
    );
} 

export default ActivitiesMenuPage;