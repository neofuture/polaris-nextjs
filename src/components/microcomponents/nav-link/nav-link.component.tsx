"use client";

import React from 'react';
import Link from 'next/link';
import styles from './nav-link.module.css';

interface NavLinkProps {
    iconName?: string;
    label: string;
    href: string;
    onClick?: () => void;
    active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ iconName, label, href, onClick, active }) => {
    return (
        <Link href={href} onClick={onClick} className={`${styles['nav-link']} ${active ? styles.active : ''}`}>
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
        </Link>
    );
}

export default NavLink;