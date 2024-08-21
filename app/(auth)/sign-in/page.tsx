"use client";

import TopPadding from "@/components/TopPadding";
import SignInForm from "@/components/forms/SignInForm";
import { useSearchParams } from "next/navigation";

export default function Page() {
    // if (activityParams){
    //     console.log(activityParams.activityId);
    // } else {
    //     console.log("no activity params")
    // }
    // const params = useParams()
    const params = useSearchParams();
    const activityId = params.get('activityId');
    const numActivityId = activityId ? parseInt(activityId) : null
    // console.log(JSON.stringify(activityParams))

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <TopPadding />
            <div className='w-full'>
                <SignInForm activityId={numActivityId} />  
            </div>
        </div>
    )
};

