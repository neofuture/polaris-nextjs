"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Button from "@/components/microcomponents/button/button.component";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {

    const ComponentWithAuth = (props: P) => {
        const { isLoggedIn } = useAuth();

        if (!isLoggedIn) {
            return (
                <div>
                    <h1>Not Authorised</h1>
                    <h2>You need to log in to view this page.</h2>
                    <Button href="/user/login" iconName='fa-sign-in'>Login</Button>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;