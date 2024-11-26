import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

interface CombinedProviderProps {
    children: React.ReactNode;
    cookies: { [key: string]: string };
}

const CombinedProvider: React.FC<CombinedProviderProps> = ({ children, cookies }) => {
    return (
        <ThemeProvider cookies={cookies}>
            <AuthProvider cookies={cookies}>
                <SidebarProvider cookies={cookies}>
                    {children}
                </SidebarProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default CombinedProvider;