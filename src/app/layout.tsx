import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import CombinedProvider from "@/context/CombinedProvider";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    title: projectName,
    description: `${projectName} NextJS Starter`,
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en" className={inter.className}>
        <head>
            <link rel="stylesheet" href="/css/fontawesome.min.css"/>
            <link rel="stylesheet" href="/css/duotone.min.css"/>
            <link rel="icon" href="/src/app/favicon.ico"/>
        </head>
        <body>
        <CombinedProvider>
            {children}
        </CombinedProvider>
        <SpeedInsights />
        </body>
        </html>
    );
}