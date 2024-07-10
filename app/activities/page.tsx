'use client'

import Link from 'next/link';
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from '@/components/TopPadding';
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";


const ActivitiesMenuPage = () => {
    const { data: session, status } = useSession()
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        if (session) {
            fetch(`/api/admin/${session?.user.id}`)
            .then((res) => res.json())
            .then((data) => setIsAdmin(data.isAdmin));
        }
    }, [session])


    return (
        <div className='w-full'>
            <TopPadding />
            
            <div className='container flex items-center justify-between'>
                <h2>Exercise Activities</h2>
                {isAdmin && <Link href='/activities/create'><PlusCircle /></Link>}
            </div>    
            
            <ActivitiesSelectionPanel />
        </div>
    );
} 

export default ActivitiesMenuPage;