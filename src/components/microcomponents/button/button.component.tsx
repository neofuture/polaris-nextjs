"use client";

import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
    iconName?: string;
    label?: string;
    onClick?: () => void;
    rounded?: boolean;
    className?: string;
    href?: string;
}

const Button: React.FC<ButtonProps> = ({ iconName, label, onClick, rounded, className, href }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (href) {
            window.location.href = href;
        }
    };

    return (
        <button onClick={handleClick} className={`${styles.button} ${rounded ? styles.rounded : ''} ${className || ''}`}>
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