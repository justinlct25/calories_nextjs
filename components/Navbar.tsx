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
        <div className='navbar py-2 border-s-zinc-200 fixed w-full top-0 z-50 h-14'>
            <div className='container flex items-center justify-between'>
                <Link href='/' className={`flex items-center space-x-2 ${activeTab === '/' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/')}>
                    <img src='/images/foodsport_icon.png' alt='Logo' className='h-11' />
                    {/* <HandMetal /> */}
                    {/* <span>Home</span> */}
                </Link>
                <Link href='/activities' className={`${activeTab === '/activities' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/activities')}>
                    Exercise Activities
                </Link>
                <Link href='/donations' className={`${activeTab === '/donations' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/donations')}>
                    Donations
                </Link>
                <Link href='/about' className={`${activeTab === '/about' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/about')}>
                    About Us
                </Link>
                {user && Object.keys(user).length !== 0 ? (
                    <>
                        <Link href={`/donors/${user.donor.id}`} className={`${activeTab === `/donors/${user.donor.id}` ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick(`/donors/${user.donor.id}`)}>
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