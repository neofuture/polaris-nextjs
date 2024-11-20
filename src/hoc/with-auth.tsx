"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";


const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth = (props: P) => {
        const { isLoggedIn } = useAuth();

        if (!isLoggedIn) {
            return (
                <div>
                    <h1>Not Authorised</h1>
                    <p>You need to log in to view this page.</p>
                    <Link href="/user/login">
                    <button>
                        <i className={'fad fa-sign-in'}/> Login
                    </button>
                    </Link>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithAuth;
};

export default withAuth;