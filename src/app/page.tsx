"use client";

import styles from "@/app/general.module.css";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import LogoDark from "../../public/images/logo_dark.png";
import Hoops from "../../public/images/hoops.png";
import Link from "next/link";
import ColorPicker from "@/components/color-picker/color-picker.component";
import ToggleSwitch from "@/components/microcomponents/toggle-switch/toggle-switch.component";
import React, {useEffect, useState} from "react";
import {useTheme} from "@/context/ThemeContext";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";
export default function Page() {
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
            <div className={styles.container}>
                <Image src={theme === "dark" ? Logo : LogoDark} alt={projectName} width={220} height={116}/>
                <Link href="/app" className={styles.link}>
                    <Image src={Hoops} alt="Continue to App" width={20} height={13}/>
                    Continue to App
                    <Image src={Hoops} alt="Continue to App" width={20} height={13}/>
                </Link>
            </div>
        </>

    );
}
