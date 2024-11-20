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
                            <NavLink iconName="fa-home" label="Home" href="/"/>
                        </li>
                        <li className={styles['sidebar__nav-list-item']}>
                            <NavLink iconName="fa-dashboard" label="Dashboard" href="/dashboard"/>
                        </li>
                        {isLoggedIn && (
                            <li className={styles['sidebar__nav-list-item']}>
                                <NavLink iconName="fa-user" label="Profile" href="/user/profile"/>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;