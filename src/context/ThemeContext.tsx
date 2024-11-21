"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface ThemeContextProps {
    theme: string;
    themeColor: string;
    toggleTheme: () => void;
    setThemeColor: (color: string) => void;
}

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [themeColor, setThemeColorState] = useState('purple');

    useEffect(() => {
        const timer = setTimeout(() => {
            document.body.style.setProperty("--transition-delay", "150ms");
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const savedTheme = Cookies.get('theme') || 'dark';
        const savedThemeColor = Cookies.get('themeColor') || 'purple';
        setTheme(savedTheme);
        setThemeColorState(savedThemeColor);
        document.documentElement.className = `${savedTheme} ${savedThemeColor}`;
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.className = `${newTheme} ${themeColor}`;
        Cookies.set('theme', newTheme, { expires: 365 });
    };

    const setThemeColor = (color: string) => {
        setThemeColorState(color);
        document.documentElement.className = `${theme} ${color}`;
        Cookies.set('themeColor', color, { expires: 365 });
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