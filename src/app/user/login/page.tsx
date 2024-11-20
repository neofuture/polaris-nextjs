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

                <Button label="Logout" onClick={logout} iconName='fa-sign-out'/>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login!</p>
            <Button label="Login" onClick={login} iconName={'fa-sign-in'}/>
        </div>
    );
};

export default Login;