"use client";

import React, { useState, useEffect } from 'react';
import styles from './cookie-consent.module.css';
import Button from "@/components/microcomponents/button/button.component";

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles['cookie-consent']}>
            <p>We use cookies to improve your experience on our site. By using our app, you consent to cookies.</p>
            <Button iconName={'fa-check'} onClick={handleAccept}>Accept</Button>
        </div>
    );
};

export default CookieConsent;