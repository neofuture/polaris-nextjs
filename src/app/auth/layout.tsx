import React from "react";
import styles from "./auth-layout.module.css";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles['auth-layout']}>
            {children}
        </div>
    );
}