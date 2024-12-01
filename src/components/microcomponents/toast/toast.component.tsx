import React, { useState, useEffect } from 'react';
import styles from './toast.module.css';

interface ToastProps {
    title: string;
    message: string;
    status?: 'info' | 'warning' | 'error' | 'disabled' | 'success' | 'default';
    onClose: () => void;
    autoClose?: number;
    onClick?: () => void;
}

const statusIconMap: { [key: string]: string } = {
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation',
    error: 'fa-circle-xmark',
    success: 'fa-circle-check',
    default: 'fa-circle-info',
    disabled: 'fa-circle-minus',
};

const Toast: React.FC<ToastProps> = ({ title, message, status = 'default', onClose, autoClose, onClick }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [pauseTimer, setPauseTimer] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (autoClose) {
            const timer = setInterval(() => {
                if (!pauseTimer) {
                    setProgress((prev) => {
                        const newProgress = prev - (100 / (autoClose / 100));
                        if (newProgress <= 0) {
                            clearInterval(timer);
                            setIsClosing(true);
                            setTimeout(onClose, 300);
                            return 0;
                        }
                        return newProgress;
                    });
                }
            }, 100);

            return () => clearInterval(timer);
        }
    }, [autoClose, pauseTimer, onClose]);

    const handleClose = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsClosing(true);
        setTimeout(onClose, 500);
    };

    return (
        <div
            className={`${styles.toast} ${styles[status]} ${isClosing ? styles['fade-out'] : ''} ${onClick ? styles['toast-clickable'] : ''}`}
            onClick={(event) => {
                if (onClick) onClick();
                handleClose(event);
            }}
            onMouseEnter={() => setPauseTimer(true)}
            onMouseLeave={() => setPauseTimer(false)}
        >
            <div className={styles['toast-content']}>
                <i className={`fa-duotone ${statusIconMap[status]}`}></i>
                <div>
                    <h4>{title}</h4>
                    <div>{message}</div>
                </div>
            </div>
            <div className={styles['close-button']}>
                <i className={`fa-duotone fa-xmark`} onClick={handleClose} title='Close'></i>
            </div>
            {autoClose && (
                <div className={styles['progress-bar-container']}>
                    <div className={styles['progress-bar']} style={{ width: `${progress}%` }}></div>
                </div>
            )}
        </div>
    );
};

export default Toast;