"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react'

interface GoBackProps {
    isNavbarPad?: boolean;
}

const GoBack: React.FC<GoBackProps> = ({ isNavbarPad }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        // <div>
            // {/* {isTopPadding && <div className='w-full'><TopPadding /></div>} */}
            <button className={`absolute left-0 top-0 transform -translate-y-1/2 ml-10 z-10 ${isNavbarPad? "mt-32":""}`} onClick={handleGoBack}>
                <ChevronLeft className="w-10 h-10" />
            </button>
        // </div>
    );
};

export default GoBack;