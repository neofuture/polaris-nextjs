import React from 'react';
import clsx from 'clsx';
import styles from './button.module.css';

interface ButtonProps {
    iconName?: string;
    onClick?: () => void;
    rounded?: boolean;
    className?: string;
    href?: string;
    children?: React.ReactNode;
    state?: 'default' | 'secondary' | 'warning' | 'error' | 'disabled' | 'success' | string;
    disabled?: boolean;
    size?: 'default' | 'small' | 'tiny';
}

const Button: React.FC<ButtonProps> = ({ iconName, onClick, rounded, className, href, children, state = 'default', disabled, size = 'default' }) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (href) {
            window.location.href = href;
        }
    };

    return (
        <button
            onClick={handleClick}
            className={clsx(
                styles.button,
                size && styles[size],
                rounded && styles.rounded,
                className,
                styles[state]
            )}
            disabled={disabled}
        >
            {iconName && (
                <>
                    {children ? (
                        <div className={styles['button__icon-wrapper']}>
                            <i className={`${iconName} ${styles.icon}`} />
                        </div>
                    ) : (
                        <i className={`${iconName} ${styles.icon}`} />
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