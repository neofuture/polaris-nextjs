"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './nav-link.module.css';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
    iconName?: string;
    href?: string;
    onClick?: () => void;
    exact?: boolean;
    secondary?: boolean;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ iconName, href, onClick, exact = false, secondary = false, children }) => {
    const [active, setActive] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (href) {
            setActive(exact ? pathname === href : pathname.startsWith(href));
        }
    }, [pathname, href, exact]);

    const className = `${styles['nav-link']} ${active ? styles.active : ''} ${secondary ? styles.secondary : ''}`;

    return href ? (
        <Link href={href} onClick={onClick} className={className}>
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
            {children && <span>{children}</span>}
        </Link>
    ) : (
        <div onClick={onClick} className={className}>
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
            {children && <span>{children}</span>}
        </div>
    );
}

export default NavLink;