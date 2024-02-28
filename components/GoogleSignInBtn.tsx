import { FC, ReactNode } from 'react';
import { Button } from './ui/button';

interface GoogleSignInBtnProps {
    children: ReactNode;
}

const GoogleSignInBtn: FC<GoogleSignInBtnProps> = ({ children }) => {
    const loginWithGoogle = () => console.log('login with Google');

    return (
        <Button onClick={loginWithGoogle} className='w-full'>
            {children}
        </Button>
    )
}

export default GoogleSignInBtn;