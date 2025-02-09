"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { CircleUserRound, Menu, X } from 'lucide-react';
import SignOutBtn from './SignOutBtn';
import { useUserStore } from '@/app/stores/user-store-provider';
import { useActiveTabStore } from '@/app/stores/active-tab-store';

const Navbar = () => {
    const { user } = useUserStore((state: any) => state);
    const { activeTab, setActiveTab } = useActiveTabStore((state: any) => ({
        activeTab: state.activeTab,
        setActiveTab: state.setActiveTab,
    }));

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setIsMobileMenuOpen(false); // Close mobile menu on tab click
        setIsUserMenuOpen(false); // Close user menu on tab click
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setIsUserMenuOpen(false); // Close user menu when opening mobile menu
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
                setIsUserMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='navbar py-2 border-s-zinc-200 fixed w-full top-0 z-50 h-14 '>
            <div className='container flex items-center justify-between'>
                <Link href='/' className={`flex items-center space-x-2 ${activeTab === '/' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/')}>
                    <img src='/images/foodsport_icon.png' alt='Logo' className='h-11' />
                </Link>
                <div className='hidden md:flex space-x-20'>
                    <Link href='/activities' className={`${activeTab === '/activities' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/activities')}>
                        Activities
                    </Link>
                    <Link href='/donations' className={`${activeTab === '/donations' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/donations')}>
                        Donations
                    </Link>
                    <Link href='/about' className={`${activeTab === '/about' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/about')}>
                        About Us
                    </Link>
                </div>
                <div className='hidden md:flex items-center space-x-4'>
                    {user && Object.keys(user).length !== 0 ? (
                        <>
                            <div className='relative'>
                                <button onClick={toggleUserMenu} className={`relative flex items-center ${activeTab === `/donors/${user.donor.id}` ? 'text-[#25ad91]' : ''}`}>
                                    <CircleUserRound className="mr-2" />
                                    <span>{user.name}</span>
                                    {user.isAdmin && <span className='text-sm ml-1'>(admin)</span>}
                                </button>
                                {isUserMenuOpen && (
                                    // <div className='absolute right-0 mt-4 w-full pl-4 pr-4 navbar shadow-lg flex flex-col items-center'>
                                    <div className='absolute dropdown right-0 mt-4 w-full pl-4 pr-4 shadow-lg flex flex-col items-center bg-white/30 backdrop-blur-lg'>
                                        <Link href={`/donors/${user.donor.id}`} className={`py-2 relative flex items-center ${activeTab === `/donors/${user.donor.id}` ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick(`/donors/${user.donor.id}`)}>
                                            Profile
                                        </Link>
                                        <div className="py-2">
                                            <SignOutBtn />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
                    )}
                </div>
                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMobileMenu} className='focus:outline-none'>
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className='fixed top-14 right-0 dropdown p-4 pl-6 pr-6 bg-white bg-opacity-90 flex flex-col items-center space-y-4 p-4 shadow-lg'>
                    <Link href='/activities' className={`${activeTab === '/activities' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/activities')}>
                        Activities
                    </Link>
                    <Link href='/donations' className={`${activeTab === '/donations' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/donations')}>
                        Donations
                    </Link>
                    <Link href='/about' className={`${activeTab === '/about' ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick('/about')}>
                        About Us
                    </Link>
                    {user && Object.keys(user).length !== 0 ? (
                        <>
                            <Link href={`/donors/${user.donor.id}`} className={`relative flex items-center ${activeTab === `/donors/${user.donor.id}` ? 'text-[#25ad91]' : ''}`} onClick={() => handleTabClick(`/donors/${user.donor.id}`)}>
                                <CircleUserRound className="mr-2" />
                                <span>{user.name}</span>
                                {user.isAdmin && <span className='text-sm ml-1'>(admin)</span>}
                            </Link>
                            <SignOutBtn />
                        </>
                    ) : (
                        <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;