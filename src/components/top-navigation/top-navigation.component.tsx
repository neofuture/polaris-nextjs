"use client";

import React, {useEffect, useState} from "react";
import {useAuth} from "@/context/AuthContext";
import {useSidebar} from "@/context/SidebarContext";
import {useTheme} from "@/context/ThemeContext";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Button from "@/components/microcomponents/button/button.component";
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import Image from "next/image";
import styles from "./top-navigation.module.css";

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
                        <ColorPicker selectedColor={themeColor} onColorSelect={setThemeColor}/>
                    </li>
                    <li className={styles['theme-switch']}>
                        <i className="fad fa-sun"/>
                        <ToggleSwitch initialState={isToggled} onToggle={toggleTheme}/>
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