"use client";

import React, {useEffect} from 'react';
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/microcomponents/button/button.component";

const Login: React.FC = () => {
    const { isLoggedIn, login, logout } = useAuth();
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Login`;
    });
    if (isLoggedIn) {
        return (
            <div>
                <h1><i className={'fad fa-check'}/> Already Logged In</h1>
                <h2>You are already logged in.</h2>

                <Button onClick={logout} iconName='fa-sign-out'>Logout</Button>
            </div>
        );
    }

    return (
        <div>
            <h1><i className={'fad fa-sign-in'}/> Login</h1>
            <h2>Welcome to the login</h2>
            <Button onClick={login} iconName={'fa-sign-in'}>Login</Button>
        </div>
    );
};

export default Login;