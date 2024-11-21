"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";
import Button from "@/components/microcomponents/button/button.component";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    function login() {
        console.log('Login');
    }

    const ComponentWithAuth = (props: P) => {
        const { isLoggedIn } = useAuth();

        if (!isLoggedIn) {
            return (
                <div>
                    <h1>Not Authorised</h1>
                    <p>You need to log in to view this page.</p>
                    <Button label="Login" href="/user/login" iconName='fa-sign-in'/>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;