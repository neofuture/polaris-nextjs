"use client";

import React from 'react';
import withAuth from "@/hoc/with-auth";

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome to your profile!</p>
        </div>
    );
};

export default withAuth(Profile);