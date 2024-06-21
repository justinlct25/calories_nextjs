import Link from 'next/link';
import { useState, useEffect } from "react";
import { Button, buttonVariants } from './ui/button';
import { HandMetal, CircleUserRound } from 'lucide-react'
import { auth } from '@/lib/auth';
import { signOut } from 'next-auth/react'
import UserAccountNav from './UserAccountNav';


const Navbar = async () => {
    const session = await auth();
    const [userInfo, setUserInfo] = useState<any>();


    return (
        // <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0'>
        <div className=' py-2  border-s-zinc-200 fixed w-full top-0 z-50'>
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
                {session?.user ? (
                    <>
                        <Link href={`/donors/${session?.user.id}`}>
                            <CircleUserRound />
                        </Link>
                        <UserAccountNav />
                    </>
                ) : (
                    <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;