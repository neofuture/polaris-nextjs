"use client";

import React, {useEffect} from 'react';
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/microcomponents/button/button.component";

const Login = () => {
    const { isLoggedIn, login, logout } = useAuth();
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Login`;
    });
    if (isLoggedIn) {
        return (
            <div>
                <h1>Already Logged In</h1>
                <p>You are already logged in.</p>

                <Button onClick={logout} iconName='fa-sign-out'>Logout</Button>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login!</p>
            <Button onClick={login} iconName={'fa-sign-in'}>Login</Button>
        </div>
    );
};

export default Login;