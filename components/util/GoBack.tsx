"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react'

interface GoBackProps {
    isNavbarPad?: boolean;
    backDirectory?: string;
}

const GoBack: React.FC<GoBackProps> = ({ isNavbarPad, backDirectory }) => {
    const router = useRouter();

    const handleGoBack = () => {
        if (backDirectory=="parent") {
            const pathArray = window.location.href.split("/");
            pathArray.pop();
            const newPath = pathArray.join('/');
            router.push(newPath);
        } else if (backDirectory === "home") {
            router.push("/activities");
        } else if (backDirectory) {
            router.push(backDirectory);
        }
    };

    return (
        // <div>
            // {/* {isTopPadding && <div className='w-full'><TopPadding /></div>} */}
            <button className={`absolute left-0 top-0 transform -translate-y-1/2 ml-10 z-10 ${isNavbarPad? "mt-24":""}`} onClick={handleGoBack}>
                <ChevronLeft className="w-10 h-10" />
            </button>
        // </div>
    );
};

export default GoBack;