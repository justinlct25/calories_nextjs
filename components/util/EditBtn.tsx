"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Pencil } from 'lucide-react'

interface EditProps {
    isNavbarPad?: boolean;
    editUrl: string;
}

const EditBtn: React.FC<EditProps> = ({ isNavbarPad, editUrl }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(editUrl);
    };

    return (
        // <div>
            // {/* {isTopPadding && <div className='w-full'><TopPadding /></div>} */}
            <button className={`absolute right-0 top-0 transform -translate-y-1/2 ml-5 mr-10 z-10 ${isNavbarPad? "mt-24":""}`} onClick={handleEdit}>
                <Pencil size={32} />
            </button>
        // </div>
    );
};

export default EditBtn;