"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface SidebarContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

interface SidebarProviderProps {
    children: React.ReactNode;
    cookies: { [key: string]: string };
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children, cookies }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>( cookies["sidebarOpen"] ==='true' || true);

    useEffect(() => {
        const cookieValue = cookies["sidebarOpen"];
        if (cookieValue) {
            setIsSidebarOpen(cookieValue === "true");
        }
    }, [cookies]);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            Cookies.set("sidebarOpen", newState.toString());
            return newState;
        });
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};