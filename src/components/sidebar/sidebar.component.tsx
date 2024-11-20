"use client";

import React from 'react';
import Link from 'next/link';
import {useAuth} from '@/context/AuthContext';
import styles from './sidebar.module.css';
import {useSidebar} from "@/context/SidebarContext";

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({className}) => {
    const {isLoggedIn} = useAuth();
    const {isSidebarOpen} = useSidebar();

    return (
        <aside className={`${className} ${isSidebarOpen ? styles.open : styles.closed}`}>
            <nav>
                <ul className={styles.navList}>
                    <li>
                        <Link href="/">
                            <div className={styles.iconWrapper}>
                                <i className={"fad fa-home icon"}/>
                            </div>
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <div className={styles.iconWrapper}>
                                <i className={"fad fa-dashboard icon"}/>
                            </div>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li>
                            <Link href="/user/profile">
                                <div className={styles.iconWrapper}>
                                    <i className="fad fa-user icon"/>
                                </div>
                                <span>Profile</span>
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;