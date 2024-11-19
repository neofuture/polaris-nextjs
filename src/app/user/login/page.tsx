"use client";

import React from 'react';
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { isLoggedIn, login, logout } = useAuth();

    if (isLoggedIn) {
        return (
            <div>
                <h1>Already Logged In</h1>
                <p>You are already logged in.</p>
                <button onClick={logout}>Logout</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login!</p>
            <button onClick={login}>Login</button>
        </div>
    );
};

export default Login;