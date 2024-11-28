import React from 'react';
import Link from 'next/link';
import styles from '@/app/general.module.css';

const NotFound: React.FC = () => {
    return (
        <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <div>Sorry, the page you are looking for does not exist.</div>
            <Link href="/">Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;