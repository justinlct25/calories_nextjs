import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface GoogleSignInBtnProps {
    children: ReactNode;
}

const GoogleSignInBtn: FC<GoogleSignInBtnProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const loginWithGoogle = async () => {
        try {
            setIsLoading(true);
            await signIn('google', { callbackUrl: 'http://localhost:3000/admin'});
        } catch(err) {
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button disabled={isLoading} onClick={loginWithGoogle} className='w-full'>
            {children}
        </Button>
    )
}

export default GoogleSignInBtn;