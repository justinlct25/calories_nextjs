'use client'

import Link from 'next/link';
import { PlusCircle } from "lucide-react";
import ActivitiesSelectionPanel from "@/components/activity/ActivitiesSelectionPanel";
import TopPadding from '@/components/TopPadding';

const ActivitiesMenuPage = () => {


    return <div>
            <TopPadding />
            <div className='container flex items-center justify-between'>
                <h2>Exercise Activities</h2>
                <Link href='/activities/create'>
                    <PlusCircle />
                </Link>
            </div>    
            <ActivitiesSelectionPanel />
        </div>;
} 

export default ActivitiesMenuPage;