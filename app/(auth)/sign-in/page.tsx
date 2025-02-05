"use client";

import { Suspense } from "react";
import TopPadding from "@/components/TopPadding";
import SignInForm from "@/components/forms/SignInForm";
import { useSearchParams } from "next/navigation";

function SignInContent() {
    const params = useSearchParams();
    const activityId = params.get('activityId');
    const numActivityId = activityId ? parseInt(activityId) : null;

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <TopPadding />
            <div className='w-full'>
                <SignInForm activityId={numActivityId} />
            </div>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}