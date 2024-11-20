"use client";

import React from 'react';
import styles from './button.module.css';

interface NavLinkProps {
    iconName?: string;
    label?: string;
    onClick?: () => void;
}

const Button: React.FC<NavLinkProps> = ({ iconName, label, onClick }) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {iconName && (
                <>
                    {label ? (
                        <div className={styles['button__icon-wrapper']}>
                            <i className={`fad ${iconName} icon`} />
                        </div>
                    ) : (
                        <i className={`fad ${iconName}`} />
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