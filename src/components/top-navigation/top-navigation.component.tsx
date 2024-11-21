"use client";

import React from "react";
import {useAuth} from "@/context/AuthContext";
import {useSidebar} from "@/context/SidebarContext";
import styles from "./top-navigation.module.css";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Button from "@/components/microcomponents/button/button.component";
import Image from "next/image";

interface TopNavigationProps {
    project: string
}

const TopNavigation: React.FC<TopNavigationProps> = ({ project }) => {
    const {isLoggedIn, logout} = useAuth();
    const {isSidebarOpen, toggleSidebar} = useSidebar();

    return (
        <header className={styles.header}>
            <nav className={styles['first-nav']}>
                <Button onClick={toggleSidebar}
                        rounded={true}
                        iconName={isSidebarOpen ? "fad fa-square" : "fad fa-sidebar"}/>
                <div className={styles.logo}>
                    <Image src='/images/hoops.png' width='48' height='28' alt={project}/>
                    <Image src="/images/polaris.png" width='80' height='14' alt={project}/>
                </div>
            </nav>
            <nav>
                <ul className={styles['nav-list']}>
                    {isLoggedIn ? (
                        <>
                            <li>
                                <NavLink iconName="fa-user" label="Profile" href="/user/profile"/>
                            </li>
                            <li>
                                <NavLink iconName="fa-sign-out" label="Logout" onClick={logout}/>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink label="Login" href="/user/login" iconName={'fa-sign-in'}/>
                        </li>
                    )}
                    <li>
                        <NavLink iconName="fa-flask" label="Labs" href="/lab"/>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default TopNavigation;