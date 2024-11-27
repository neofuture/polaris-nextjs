"use client";

import React, {useEffect, useState} from "react";
import styles from "./layout.module.css";
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import {useTheme} from "@/context/ThemeContext";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    const {theme, themeColor, toggleTheme, setThemeColor} = useTheme();
    const [isToggled, setIsToggled] = useState(theme === 'dark');

    useEffect(() => {
        setIsToggled(theme === 'dark');
    }, [theme]);

    return (
        <>
            <div className={styles['theme-picker']}>
                <ul className={styles['nav-list']}>
                    <li>
                        <ColorPicker selectedColor={themeColor} onColorSelect={setThemeColor}/>
                    </li>
                    <li className={styles['theme-switch']}>
                        <i className="fad fa-sun"/>
                        <ToggleSwitch initialState={isToggled} onToggle={toggleTheme}/>
                        <i className="fad fa-moon"/>
                    </li>
                </ul>
            </div>
            <div className={styles['auth-layout']}>
                <div className={styles['auth-layout__content']}>
                    {children}
                </div>
            </div>
        </>
    );
}