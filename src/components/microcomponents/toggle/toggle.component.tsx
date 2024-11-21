"use client";

import React, { useState } from 'react';
import styles from './toggle.module.css';

interface ToggleProps {
    initialState?: boolean;
    onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialState = false, onToggle }) => {
    const [isToggled, setIsToggled] = useState(initialState);

    const handleToggle = () => {
        const newState = !isToggled;
        setIsToggled(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    return (
        <div className={styles.toggle} onClick={handleToggle}>
            <div className={`${styles.switch} ${isToggled ? styles.toggled : ''}`} />
        </div>
    );
};

export default Toggle;