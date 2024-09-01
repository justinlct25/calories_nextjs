'use client'

import Link from 'next/link';
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from '@/components/TopPadding';
import { useUserStore } from '../stores/user-store-provider';


const ActivitiesMenuPage = () => {
    const { user } = useUserStore(
        (state) => state,
    )


    return (
        <div className='w-full'>
            <TopPadding />
            
            <div className='container flex items-center justify-between'>
                <h2>Exercise Activities</h2>
                {user.isAdmin && <Link href='/activities/create'><PlusCircle /></Link>}
            </div>    
            
            <ActivitiesSelectionPanel />
            <div>
                User: {JSON.stringify(user)}
            </div>

        </div>
    );
} 

export default ActivitiesMenuPage;