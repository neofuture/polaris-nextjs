import type {Metadata} from "next";
import "./globals.css";
import TopNavigation from "@/components/top-navigation/top-navigation.component";
import Sidebar from "@/components/sidebar/sidebar.component";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <TopNavigation/>
        <div style={{display: "flex"}}>
            <Sidebar/>
            <main style={{flex: 1}}>
                {children}
            </main>
        </div>
        </body>
        </html>
    );
}