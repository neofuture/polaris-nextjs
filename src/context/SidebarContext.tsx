"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface SidebarContextProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    isLoading: boolean; // Add this line
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const cookieValue = Cookies.get("sidebarOpen");
        if (cookieValue) {
            setIsSidebarOpen(cookieValue === "true");
        }
        setIsLoading(false);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            const newState = !prev;
            Cookies.set("sidebarOpen", newState.toString());
            return newState;
        });
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar, isLoading }}>
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