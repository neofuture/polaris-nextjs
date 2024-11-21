"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {useSidebar} from "@/context/SidebarContext";
import styles from "./top-navigation.module.css";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Button from "@/components/microcomponents/button/button.component";
import Image from "next/image";
import Toggle from "@/components/microcomponents/toggle/toggle.component";
import {useTheme} from "@/context/ThemeContext";

interface TopNavigationProps {
    project: string;
}

const TopNavigation: React.FC<TopNavigationProps> = ({project}) => {
    const {isLoggedIn} = useAuth();
    const {isSidebarOpen, toggleSidebar} = useSidebar();
    const {theme, themeColor, toggleTheme, setThemeColor} = useTheme();
    const [isToggled, setIsToggled] = useState(theme === 'dark');

    useEffect(() => {
        setIsToggled(theme === 'dark');
    }, [theme]);

    const handleSetColor = (color: string) => () => {
        setThemeColor(color);
    };

    return (
        <header className={styles.header}>
            <nav className={styles['first-nav']}>
                <Button onClick={toggleSidebar}
                        rounded={true}
                        iconName={isSidebarOpen ? "fad fa-square" : "fad fa-sidebar"}/>
                <div className={styles.logo}>
                    <Image src='/images/hoops.png' width='48' height='28' alt={project}/>
                    <Image src={theme === 'dark' ? '/images/polaris.png' : '/images/polaris_dark.png'} width='80'
                           height='14' alt={project}/>
                </div>
            </nav>
            <nav>
                <ul className={styles['nav-list']}>
                    <li>
                        <div
                            className={`${styles['blue']} ${styles['pip']} ${themeColor === 'blue' ? styles['active'] : ''}`}
                            onClick={handleSetColor('blue')}></div>
                        <div
                            className={`${styles['green']} ${styles['pip']} ${themeColor === 'green' ? styles['active'] : ''}`}
                            onClick={handleSetColor('green')}></div>
                        <div
                            className={`${styles['orange']} ${styles['pip']} ${themeColor === 'orange' ? styles['active'] : ''}`}
                            onClick={handleSetColor('orange')}></div>
                        <div
                            className={`${styles['purple']} ${styles['pip']} ${themeColor === 'purple' ? styles['active'] : ''}`}
                            onClick={handleSetColor('purple')}></div>
                        <div
                            className={`${styles['red']} ${styles['pip']} ${themeColor === 'red' ? styles['active'] : ''}`}
                            onClick={handleSetColor('red')}></div>
                        <div
                            className={`${styles['grey']} ${styles['pip']} ${themeColor === 'grey' ? styles['active'] : ''}`}
                            onClick={handleSetColor('grey')}></div>

                    </li>
                    <li className={styles['theme-switch']}>
                        <i className="fad fa-sun"/>
                        <Toggle initialState={isToggled} onToggle={toggleTheme}/>
                        <i className="fad fa-moon"/>
                    </li>
                    {isLoggedIn ? (
                        <li>
                            <NavLink iconName="fa-user" href="/user/profile">Profile</NavLink>
                        </li>
                    ) : (
                        <li>
                            <NavLink href="/user/login" iconName={'fa-sign-in'}>Login</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default TopNavigation;