"use client";

import React from 'react';
import {useAuth} from '@/context/AuthContext';
import styles from './sidebar.module.css';
import {useSidebar} from '@/context/SidebarContext';
import clsx from "clsx";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";

const Sidebar: React.FC = () => {
    const {isLoggedIn} = useAuth();
    const {isSidebarOpen} = useSidebar();

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
                            <NavLink iconName="fa-home" href="/" exact={true}>Home</NavLink>
                        </li>
                        <li className={styles['sidebar__nav-list-item']}>
                            <NavLink iconName="fa-dashboard" href="/dashboard">Dahsboard</NavLink>
                        </li>
                        {!isLoggedIn && (
                            <li className={styles['sidebar__nav-list-item']}>
                                <NavLink iconName="fa-sign-in" href="/user/login">Login</NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className={styles['sidebar__nav-list-item']}>
                                <NavLink iconName="fa-user" href="/user/profile">Profile</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;