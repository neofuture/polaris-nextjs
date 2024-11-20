"use client";

import React from "react";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import {useSidebar} from "@/context/SidebarContext";
import styles from "./top-navigation.module.css";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Button from "@/components/microcomponents/button/button.component";

const TopNavigation: React.FC = () => {
    const {isLoggedIn, logout} = useAuth();
    const {isSidebarOpen, toggleSidebar} = useSidebar();

    return (
        <header className={styles.header}>
            <nav className={styles['first-nav']}>

                <Button onClick={toggleSidebar}
                        iconName={isSidebarOpen ? "fad fa-square" : "fad fa-sidebar"}/>

                <div className={styles.logo}>
                    <img src="/images/hoops.png" className={styles.hoops}/>
                    <img src="/images/polaris.png" className={styles.polaris}/>
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
                                <NavLink iconName="fa-sign-out" label="Profile" href="/user/profile" onClick={logout}/>
                            </li>
                            <li>
                                <NavLink label="Test" href="/test"/>
                            </li>
                        </>
                    ) : (
                        <li>
                            <NavLink label="Login" href="/user/login" iconName={'fa-sign-in'}/>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default TopNavigation;