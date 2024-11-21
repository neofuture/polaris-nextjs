"use client";

import React, { useEffect, useState } from 'react';
import styles from './toggle-switch.module.css';

interface ToggleProps {
    initialState: boolean;
    onToggle: () => void;
    viewStateOn?: string;
    viewStateOff?: string;
}

const ToggleSwitch: React.FC<ToggleProps> = ({ initialState, onToggle, viewStateOn, viewStateOff }) => {
    const [isToggled, setIsToggled] = useState(initialState);

    useEffect(() => {
        setIsToggled(initialState);
    }, [initialState]);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle();
    };

    return (
        <div className={styles.toggleContainer}>
            <div className={styles.toggle} onClick={handleToggle}>
                <div className={`${styles.switch} ${isToggled ? styles.toggled : ''}`} />
            </div>
            {viewStateOn && viewStateOff && (
                <span className={styles.label}>{isToggled ? viewStateOn : viewStateOff}</span>
            )}
        </div>
    );
};

export default ToggleSwitch;