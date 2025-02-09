"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Pencil } from 'lucide-react'

interface EditProps {
    isNavbarPad?: boolean;
    bottom?: boolean;
    absolute?: boolean;
    editUrl: string;
}

const EditBtn: React.FC<EditProps> = ({ isNavbarPad, bottom, absolute, editUrl }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(editUrl);
    };

    return (
        // <div>
            // {/* {isTopPadding && <div className='w-full'><TopPadding /></div>} */}
            <button className={`${absolute? 'absolute transform -translate-y-1/2 ml-5 mr-10' : ''} right-0 ${bottom? "bottom-0" : "top-0"}  z-10 ${isNavbarPad? "mt-24 mb-24" :"mt-2 mb-2"}`} onClick={handleEdit}>
                <Pencil size={30} />
            </button>
        // </div>
    );
};

export default EditBtn;