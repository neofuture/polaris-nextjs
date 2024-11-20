"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './nav-link.module.css';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    iconName?: string;
    label: string;
    href?: string;
    onClick?: () => void;
    exact?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ iconName, label, href, onClick, exact = false }) => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (href) {
            setActive(exact ? pathname === href : pathname.startsWith(href));
        }
    }, [pathname, href, exact]);

    const className = `${styles['nav-link']} ${active ? styles.active : ''}`;

    return href ? (
        <Link href={href} onClick={onClick} className={className}>
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
            {label && <span>{label}</span>}
        </Link>
    ) : (
        <div onClick={onClick} className={className}>
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
            {label && <span>{label}</span>}
        </div>
    );
}

export default NavLink;