'use client'

import Link from 'next/link';
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from '@/components/TopPadding';
import { useUserStore } from '../stores/user-store-provider';
import { useEffect } from 'react';
import { useActiveTabStore } from '../stores/active-tab-store';


const ActivitiesMenuPage = () => {
    const { user } = useUserStore(
        (state) => state,
    )

    const { setActiveTab } = useActiveTabStore((state) => ({
        setActiveTab: state.setActiveTab,
    }));

    useEffect(() => {
        setActiveTab('/activities');
    }, [setActiveTab]);


    return (
        <div className='w-full '>
            <TopPadding />
            <div className='container flex items-center justify-between max-w-screen-xl mx-auto relative'>
                {/* <h2 className="text-3xl font-bold px-20">Exercise Activities</h2> */}
                {user && user.isAdmin && (
                    <Link href='/activities/create' className='absolute top-6 right-4'>
                        <PlusCircle className='h-8 w-8 ' />
                    </Link>
                )}
            </div>    
            <ActivitiesSelectionPanel isAdmin={user ? user.isAdmin : false} />
            {/* <div>
                User: {JSON.stringify(user)}
            </div> */}

        </div>
    );
} 

export default ActivitiesMenuPage;