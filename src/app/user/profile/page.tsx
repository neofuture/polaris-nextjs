"use client";

import React, {useEffect} from 'react';
import withAuth from "@/hoc/with-auth";

const Profile = () => {
    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Profile`;
    });
    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome to your profile!</p>
        </div>
    );
};

export default withAuth(Profile);