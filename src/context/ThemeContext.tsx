"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import {Inter} from "next/font/google";

interface ThemeContextProps {
    theme: string;
    themeColor: string;
    toggleTheme: () => void;
    setThemeColor: (color: string) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
    cookies: { [key: string]: string };
}

const inter = Inter({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, cookies }) => {
    const [theme, setTheme] = useState(cookies['theme'] || 'dark');
    const [themeColor, setThemeColorState] = useState(cookies['themeColor'] || 'purple');

    useEffect(() => {
        const savedTheme = cookies['theme'] || 'dark';
        const savedThemeColor = cookies['themeColor'] || 'purple';
        setTheme(savedTheme);
        setThemeColorState(savedThemeColor);
        document.documentElement.className = `${inter.className} ${savedTheme} ${savedThemeColor}`;
    }, [cookies]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = document.documentElement.className.replace(theme, newTheme);
        const consent = localStorage.getItem('cookieConsent') === 'true';
        if (consent) {
            Cookies.set('theme', newTheme, { expires: 365 });
        }
    };

    const setThemeColor = (color: string) => {
        setThemeColorState(color);
        document.documentElement.className = document.documentElement.className.replace(themeColor, color);
        const consent = localStorage.getItem('cookieConsent') === 'true';
        if (consent) {
            Cookies.set('themeColor', color, { expires: 365 });
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, themeColor, toggleTheme, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};