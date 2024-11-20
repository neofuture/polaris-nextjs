"use client";

import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
    iconName?: string;
    label?: string;
    onClick?: () => void;
    rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({ iconName, label, onClick, rounded }) => {
    return (
        <button onClick={onClick} className={`${styles.button} ${rounded ? styles.rounded : ''}`}>
            {iconName && (
                <>
                    {label ? (
                        <div className={styles['button__icon-wrapper']}>
                            <i className={`fad ${iconName} ${styles.icon}`} />
                        </div>
                    ) : (
                        <i className={`fad ${iconName} ${styles.icon}`} />
                    )}
                </>
            )}
            {label && (
                <span>{label}</span>
            )}
        </button>
    );
}

export default Button;