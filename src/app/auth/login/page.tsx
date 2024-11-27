"use client";

import React, {useEffect} from 'react';
import {useAuth} from "@/context/AuthContext";
import Button from "@/components/microcomponents/button/button.component";
import {redirect} from "next/navigation";

const Login: React.FC = () => {
    const {isLoggedIn, login} = useAuth();
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Login`;
    });
    useEffect(() => {
        if (isLoggedIn) {
            redirect('/app');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h1><i className={'fad fa-sign-in'}/> Login</h1>
            <h2>Welcome to the login</h2>
            <Button onClick={login} iconName={'fa-sign-in'}>Login</Button>
        </div>
    );
};

export default Login;