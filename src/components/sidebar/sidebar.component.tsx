"use client";

import React from 'react';
import Link from 'next/link';
import {useAuth} from '@/context/AuthContext';
import styles from './sidebar.module.css';
import {useSidebar} from "@/context/SidebarContext";
import clsx from "clsx";

const Sidebar: React.FC= () => {
    const {isLoggedIn} = useAuth();
    const {isSidebarOpen} = useSidebar();

    return (
        <div className={clsx(styles.sidebarContainer, { [styles.containerOpen]: isSidebarOpen, [styles.containerClosed]: !isSidebarOpen })}>
            <div className={clsx(styles.sidebar, { [styles.open]: isSidebarOpen, [styles.closed]: !isSidebarOpen })}>
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
            </div>
        </div>
    );
}

export default Sidebar;