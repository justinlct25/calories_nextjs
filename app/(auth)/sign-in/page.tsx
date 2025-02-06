"use client";

import { Suspense } from "react";
import TopPadding from "@/components/TopPadding";
import SignInForm from "@/components/forms/SignInForm";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function SignInContent() {
    const params = useSearchParams();
    const activityId = params.get('activityId');
    const numActivityId = activityId ? parseInt(activityId) : null;

    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <TopPadding />
            <div className='w-full flex flex-col items-center '>
                {/* <Image
                    src="/images/foodsport_icon.png"
                    alt="Foodsport Icon"
                    width={500}
                    height={500}
                    className="mb-6"
                /> */}
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