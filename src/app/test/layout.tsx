import React from "react";
import CombinedProvider from "@/context/CombinedProvider";
import { cookies } from "next/headers";

export default async function TestLayout({ children }: { children: React.ReactNode }) {
    const cookiesHeader = await cookies();
    const parsedCookies: { [key: string]: string } = {};
    cookiesHeader.getAll().forEach((cookie) => {
        parsedCookies[cookie.name] = cookie.value;
    });

    return (
        <CombinedProvider cookies={parsedCookies}>
            {children}
        </CombinedProvider>
    );
}