"use client";

import React, {useEffect} from 'react';
import { useAuth } from "@/context/AuthContext";

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
                <button onClick={logout}>
                    <i className={"fad fa-sign-out icon"}/> Logout
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login!</p>
            <button onClick={login}>
                <i className={"fad fa-sign-in icon"}/> Login
            </button>
        </div>
    );
};

export default Login;