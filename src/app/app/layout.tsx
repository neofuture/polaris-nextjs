import React from "react";
import TopNavigation from "@/components/top-navigation/top-navigation.component";
import Sidebar from "@/components/sidebar/sidebar.component";
import styles from "./app.module.css";
import ToastManager from "@/components/microcomponents/toast/toast-manager.component";

const projectName = process.env.NEXT_PUBLIC_PROJECT_NAME || "Default Project Name";


export default function AppLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <TopNavigation project={projectName}/>
            <div className={styles.layout}>
                <Sidebar/>
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
}