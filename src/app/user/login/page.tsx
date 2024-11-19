"use client";

import React from 'react';
import { useAuth } from "@/context/AuthContext";

const Login = () => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return (
            <div>
                <h1>Already Logged In</h1>
                <p>You are already logged in.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login!</p>
        </div>
    );
};

export default Login;