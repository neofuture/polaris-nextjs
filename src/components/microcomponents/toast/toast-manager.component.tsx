"use client";

import React, { useState, useEffect } from 'react';
import Toast from './toast.component';
import styles from './toast-manager.module.css';

interface ToastMessage {
    id: number;
    title: string;
    message: string;
    status?: 'warning' | 'error' | 'disabled' | 'success' | 'default';
    autoClose?: number;
    onClick?: () => void;
}

const ToastManager: React.FC = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    useEffect(() => {
        const handleAddToast = (event: CustomEvent) => {
            const { title, message, status, autoClose, onClick } = event.detail;
            setToasts((prevToasts) => [...prevToasts, { id: Date.now(), title, message, status, autoClose, onClick }]);
        };

        window.addEventListener('add-toast', handleAddToast as EventListener);

        return () => {
            window.removeEventListener('add-toast', handleAddToast as EventListener);
        };
    }, []);

    const removeToast = (id: number) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <Toast key={toast.id}
                       onClick={toast.onClick}
                       title={toast.title}
                       message={toast.message}
                       status={toast.status}
                       autoClose={toast.autoClose}
                       onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

export default ToastManager;