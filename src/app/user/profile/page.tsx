"use client";

import React, {useEffect} from 'react';
import withAuth from "@/hoc/with-auth";

const Profile = () => {
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Profile`;
    });
    return (
        <div>
            <h1><i className={'fad fa-user'}/> Profile</h1>
            <h2>Welcome to your profile</h2>
        </div>
    );
};

export default withAuth(Profile);