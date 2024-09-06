"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Pencil } from 'lucide-react'

interface EditProps {
    isNavbarPad?: boolean;
    bottom?: boolean;
    editUrl: string;
}

const EditBtn: React.FC<EditProps> = ({ isNavbarPad, bottom, editUrl }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(editUrl);
    };

    return (
        // <div>
            // {/* {isTopPadding && <div className='w-full'><TopPadding /></div>} */}
            <button className={`absolute right-0 ${bottom? "bottom-0" : "top-0"} transform -translate-y-1/2 ml-5 mr-10 z-10 ${isNavbarPad? "mt-24 mb-24" :"mt-2 mb-2"}`} onClick={handleEdit}>
                <Pencil size={32} />
            </button>
        // </div>
    );
};

export default EditBtn;