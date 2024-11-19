"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './sidebar.module.css';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const { isLoggedIn } = useAuth();

    return (
        <aside className={className}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/">
                            <i className={"fad fa-home icon"}/> Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <i className={"fad fa-dashboard icon"}/> Dashboard
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link href="/user/profile">
                                <i className="fad fa-user icon"/> Profile
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;