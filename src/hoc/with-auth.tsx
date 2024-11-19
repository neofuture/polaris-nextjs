"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
    const ComponentWithAuth = (props: any) => {
        const { isLoggedIn } = useAuth();

        if (!isLoggedIn) {
            return (
                <div>
                    <h1>Not Authorised</h1>
                    <p>You need to log in to view this page.</p>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;