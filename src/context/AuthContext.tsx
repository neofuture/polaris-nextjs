"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {showToast} from "@/components/microcomponents/toast/toast-utils";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; cookies: { [key: string]: string } }> = ({ children, cookies }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(cookies["loggedIn"] === "true" || false);

    useEffect(() => {
        const cookieValue = cookies["loggedIn"];
        if (cookieValue) {
            setIsLoggedIn(cookieValue === "true");
        }
    }, [cookies]);

    const login = () => {
        setIsLoggedIn(true);
        const consent = localStorage.getItem('cookieConsent') === 'true';
        if (consent) {
            Cookies.set("loggedIn", "true");
        } else {
            showToast("Error", "Please accept cookies to login", "error", 4000);
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        const consent = localStorage.getItem('cookieConsent') === 'true';
        if (consent) {
            Cookies.set("loggedIn", "false");
        }
        window.location.href = "/auth/login";
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};