import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { SidebarProvider } from "@/context/SidebarContext";
import TopNavigation from "@/components/top-navigation/top-navigation.component";
import Sidebar from "@/components/sidebar/sidebar.component";
import "./globals.css";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";

export const metadata = {
    title: projectName,
    description: `${projectName} NextJS Starter`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/fontawesome.min.css" />
            <link rel="stylesheet" href="/css/duotone.min.css" />
        </head>
        <body>
        <AuthProvider>
            <SidebarProvider>
                <TopNavigation />
                <div className="layout">
                    <Sidebar/>
                    <main className="main">{children}</main>
                </div>
            </SidebarProvider>
        </AuthProvider>
        </body>
        </html>
    );
}