"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const cookieValue = Cookies.get("loggedIn");
        if (cookieValue) {
            setIsLoggedIn(cookieValue === "true");
        }
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        Cookies.set("loggedIn", "true");
    };

    const logout = () => {
        setIsLoggedIn(false);
        Cookies.set("loggedIn", "false");
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