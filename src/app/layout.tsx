import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import CombinedProvider from "@/context/CombinedProvider";
import { cookies } from "next/headers";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    title: projectName,
    description: `${projectName} NextJS Starter`,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookiesHeader = await cookies();
    const parsedCookies: { [key: string]: string } = {};
    cookiesHeader.getAll().forEach((cookie) => {
        parsedCookies[cookie.name] = cookie.value;
    });

    const savedTheme = parsedCookies['theme'] || 'dark';
    const savedThemeColor = parsedCookies['themeColor'] || 'purple';
    const className = `${savedTheme} ${savedThemeColor}`;

    return (
        <html lang="en" className={`${inter.className} ${className}`}>
        <head>
            <link rel="stylesheet" href="/css/fontawesome.min.css"/>
            <link rel="stylesheet" href="/css/duotone.min.css"/>
            <link rel="icon" href="/src/app/favicon.ico"/>
        </head>
        <body>
        <CombinedProvider cookies={parsedCookies}>
            {children}
        </CombinedProvider>
        <SpeedInsights />
        </body>
        </html>
    );
}