"use client";

import React from 'react';
import styles from './button.module.css';

interface ButtonProps {
    iconName?: string;
    onClick?: () => void;
    rounded?: boolean;
    className?: string;
    href?: string;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ iconName, onClick, rounded, className, href, children }) => {
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
                    {children ? (
                        <div className={styles['button__icon-wrapper']}>
                            <i className={`fad ${iconName} ${styles.icon}`} />
                        </div>
                    ) : (
                        <i className={`fad ${iconName} ${styles.icon}`} />
                    )}
                </>
            )}
            {children && (
                <span>{children}</span>
            )}
        </button>
    );
}

export default Button;