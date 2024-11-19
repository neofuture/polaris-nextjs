"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import styles from "./top-navigation.module.css";
const TopNavigation: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <nav>
                <ul className={styles.navList}>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <Link href="/user/profile">
                                    <i className="fad fa-user icon"/> Profile
                                </Link>
                            </li>
                            <li>
                                <a onClick={logout}>
                                    <i className="fad fa-sign-out icon"/> Logout
                                </a>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link href="/user/login">
                                <i className="fad fa-sign-in icon"/> Login
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default TopNavigation;