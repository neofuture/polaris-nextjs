"use client";

import React, { useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/microcomponents/button/button.component";
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
    const { isLoggedIn, login } = useAuth();
    const router = useRouter();

    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Login`;
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            router.push('/app');
        }
    }, [isLoggedIn, router]);

    return (
        <div>
            <h1><i className={'fad fa-sign-in'} /> Login</h1>
            <h2>Welcome to the login</h2>
            <Button onClick={login} iconName={'fad fa-sign-in'}>Login</Button>
            <Button href='/auth/register' iconName='fad fa-user-plus'>Register</Button>
        </div>
    );
};

export default Login;