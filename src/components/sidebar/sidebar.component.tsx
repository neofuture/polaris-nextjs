"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from './sidebar.module.css';
import { useSidebar } from '@/context/SidebarContext';
import clsx from "clsx";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Link from "next/link";

const Sidebar: React.FC = () => {
    const { isLoggedIn, logout } = useAuth();
    const { isSidebarOpen } = useSidebar();

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
                            <NavLink iconName="fad fa-home" href="/app" exact={true}>Home</NavLink>
                        </li>
                        <li className={styles['sidebar__nav-list-item']}>
                            <NavLink iconName="fad fa-dashboard" href="/app/dashboard">Dashboard</NavLink>
                        </li>
                        {!isLoggedIn && (
                            <li className={styles['sidebar__nav-list-item']}>
                                <NavLink iconName="fad fa-sign-in" href="/auth/login">Login</NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <>
                                <li className={styles['sidebar__nav-list-item']}>
                                    <NavLink iconName="fad fa-user" href="/app/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <NavLink iconName="fad fa-sign-out" onClick={logout}>Logout</NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <hr/>
                        </li>
                        <li>
                            <NavLink iconName="fad fa-flask" href="/app/the-lab">The Lab</NavLink>
                            <ul>
                                <li><NavLink secondary={true} iconName="fad fa-text" href="/app/the-lab/text-builder">Text Builder</NavLink></li>
                                <li><NavLink secondary={true} iconName="fad fa-stop" href="/app/the-lab/button-builder">Button Builder</NavLink></li>
                            </ul>
                        </li>
                        <li>
                            <Link href='https://www.google.com' passHref={true}>Google (Link)</Link>
                        </li>
                        <li>
                            <a href='https://www.google.com'>Google (Anchor)</a>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;