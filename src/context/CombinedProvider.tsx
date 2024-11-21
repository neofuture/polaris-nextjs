import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

const CombinedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SidebarProvider>
                    {children}
                </SidebarProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default CombinedProvider;