"use client";


import Link from 'next/link';
import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import { Button, buttonVariants } from './ui/button';
import { HandMetal, CircleUserRound } from 'lucide-react'
import { signOut } from 'next-auth/react'
import SignOutBtn from './SignOutBtn';


const Navbar = () => {
    // const session = await auth();
    const { data: session, status } = useSession()
    const [userInfo, setUserInfo] = useState<any>();

    useEffect(() => {
        if (session) {
            fetch(`/api/user/${session?.user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setUserInfo(data.user);
                    }
                });
        }
    }, [session]);


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
                {userInfo ? (
                    <>
                        <Link href={`/donors/${userInfo.donor.id}`}>
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