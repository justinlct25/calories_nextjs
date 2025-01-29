"use client";


import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { HandMetal, CircleUserRound } from 'lucide-react'
import SignOutBtn from './SignOutBtn';
import { useUserStore } from '@/app/stores/user-store-provider';
import { useActiveTabStore } from '@/app/stores/active-tab-store';


const Navbar = () => {
    const { user } = useUserStore(
        (state: any) => state,
      )

    const { activeTab, setActiveTab } = useActiveTabStore((state: any) => ({
        activeTab: state.activeTab,
        setActiveTab: state.setActiveTab,
    }));

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };


    return (
        // <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0'>
        <div className='navbar py-2 border-s-zinc-200 fixed w-full top-0 z-50 h-14'>
            <div className='container flex items-center justify-between'>
                <Link href='/' className="flex items-center space-x-2">
                    <HandMetal />
                    <span>Home</span>
                </Link>
                <Link href='/activities'>
                    Exercise Activities
                </Link>
                <Link href='/'>
                    Donations
                </Link>
                <Link href='/'>
                    About Us
                </Link>
                {user && Object.keys(user).length !== 0 ? (
                    <>
                        <Link href={`/donors/${user.donor.id}`}>
                            <CircleUserRound />
                        </Link>
                        <SignOutBtn />
                    </>
                ) : (
                    <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;