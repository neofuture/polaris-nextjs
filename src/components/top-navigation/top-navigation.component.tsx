"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import NavLink from "@/components/microcomponents/nav-link/nav-link.component";
import Button from "@/components/microcomponents/button/button.component";
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import styles from "./top-navigation.module.css";
import Hoops from "../../../public/images/hoops.png";
import Polaris from "../../../public/images/polaris.png";
import PolarisDark from "../../../public/images/polaris_dark.png";
import avatar from "../../../public/images/avatar.jpg";
import Link from "next/link";

interface TopNavigationProps {
    project: string;
}

const TopNavigation: React.FC<TopNavigationProps> = ({project}) => {
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
                    <Image src={Hoops} width={46} height={28} alt={project}/>
                    <Image src={theme === 'dark' ? Polaris : PolarisDark} width={80}
                           height={14} alt={project}/>
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
                    <li>
                        <Link  href="/app/profile">
                        <Image className={styles['avatar']} src={avatar} alt={'User Name'} width={32} height={32}/>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default TopNavigation;