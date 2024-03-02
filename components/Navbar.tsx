import Link from 'next/link';
import { Button, buttonVariants } from './ui/button';
import { HandMetal } from 'lucide-react'
import { auth } from '@/lib/auth';
import { signOut } from 'next-auth/react'
import UserAccountNav from './UserAccountNav';


const Navbar = async () => {
    const session = await auth();

    return (
        <div className=' bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full top-0'>
            <div className='container flex items-center justify-between'>
                <Link href='/'>
                    <HandMetal />
                </Link>
                {session?.user ? (
                    <UserAccountNav />
                ) : (
                    <Link className={buttonVariants()} href='/sign-in'>Sign In</Link>
                
                )}
            </div>
        </div>
    );
};

export default Navbar;