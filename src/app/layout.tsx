import type { Metadata } from "next";
import "./globals.css";
import TopNavigation from "@/components/top-navigation/top-navigation.component";
import Sidebar from "@/components/sidebar/sidebar.component";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";

export const metadata: Metadata = {
    title: projectName,
    description: `${projectName} NextJS Starter`,
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="stylesheet" href="/css/fontawesome.min.css"/>
            <link rel="stylesheet" href="/css/duotone.min.css"/>
        </head>
        <body>
        <AuthProvider>
            <TopNavigation/>
            <div className="layout">
                <Sidebar className="sidebar"/>
                <main className="main">
                    {children}
                </main>
            </div>
        </AuthProvider>
        </body>
        </html>
    );
}