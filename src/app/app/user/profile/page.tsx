"use client";

import React, {useEffect} from 'react';
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import {useAuth} from "@/context/AuthContext";

const Profile: React.FC = () => {
    const {logout} = useAuth();

    useEffect(() => {
        document.title = `${process.env.NEXT_PUBLIC_PROJECT_NAME} - Profile`;
    });
    return (
        <div>
            <h1><i className={'fad fa-user'}/> Profile</h1>
            <h2>Welcome to your profile</h2>
            <NavLink iconName="fa-sign-out" onClick={logout}>Logout</NavLink>
        </div>
    );
};

export default Profile;