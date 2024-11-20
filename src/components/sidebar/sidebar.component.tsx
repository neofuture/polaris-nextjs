"use client";

import React from 'react';
import {useAuth} from '@/context/AuthContext';
import styles from './sidebar.module.css';
import {useSidebar} from '@/context/SidebarContext';
import clsx from "clsx";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import {useRouter} from 'next/router';

const Sidebar: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const {isSidebarOpen} = useSidebar();
    const router = useRouter();

    const isActive = (href: string) => router.pathname.startsWith(href);

    return (
        <div className={clsx(styles.sidebar, {
            [styles['sidebar__container--open']]: isSidebarOpen,
            [styles['sidebar__container--closed']]: !isSidebarOpen
        })}>
            <div className={clsx(styles.sidebar__content, {
                [styles['sidebar__content--open']]: isSidebarOpen,
                [styles['sidebar__content--closed']]: !isSidebarOpen
            })}>
                <nav>
                    <ul className={styles['sidebar__nav-list']}>
                        <li className={styles['sidebar__nav-list-item']}>
                            <NavLink iconName="fa-home" label="Home" href="/" active={isActive("/")}/>
                        </li>
                        <li className={styles['sidebar__nav-list-item']}>
                            <NavLink iconName="fa-dashboard" label="Dashboard" href="/dashboard" active={isActive("/dashboard")}/>
                        </li>
                        {isLoggedIn && (
                            <li className={styles['sidebar__nav-list-item']}>
                                <NavLink iconName="fa-user" label="Profile" href="/user/profile" active={isActive("/user/profile")}/>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;