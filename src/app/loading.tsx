import styles from "@/app/general.module.css";
import React from "react";

const Loading: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>Loading</h1>
            <div>Please wait...</div>
        </div>
    );
}

export default Loading;