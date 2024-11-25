import React from 'react';
import Link from 'next/link';
import styles from './not-found.module.css';

const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;