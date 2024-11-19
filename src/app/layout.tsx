import type {Metadata} from "next";
import "./globals.css";
import TopNavigation from "@/components/top-navigation/top-navigation.component";
import Sidebar from "@/components/sidebar/sidebar.component";
import React from "react";

export const metadata: Metadata = {
    title: "Polaris",
    description: "Polaris NextJS Starter",
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
        <TopNavigation/>
        <div>
        <Sidebar/>
            <main>
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}