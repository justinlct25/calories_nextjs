"use client"

import { useRouter } from 'next/navigation';
import TopPadding from './TopPadding';
import { ChevronLeft } from 'lucide-react'


const PageUnderNavbarWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <div className='w-full'>
            <TopPadding />
            <div className='w-full relative'>
                <div className="ml-20 mr-20">
                    {children}
                </div>
            </div>

        </div>
    );
};

export default PageUnderNavbarWrapper;