import React from "react";
import CombinedProvider from "@/context/CombinedProvider";

export default function TestLayout({children}: { children: React.ReactNode }) {
    return (
        <CombinedProvider>
            {children}
        </CombinedProvider>
    );
}