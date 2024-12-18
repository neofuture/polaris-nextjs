import React, { useEffect, useState } from 'react';

import Button from '@/components/microcomponents/button/button.component';

import styles from './modal.module.css';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseButton?: boolean;
    allowBlurClose?: boolean;
    closeTimer?: number;
    closeLabel?: string;
    action?: () => void;
    actionLabel?: string;
    actionCancel?: () => void;
    actionCancelLabel?: string;
}

function Modal({
                   isOpen,
                   onClose,
                   children,
                   showCloseButton = true,
                   allowBlurClose = true,
                   closeTimer,
                   closeLabel,
                   action,
                   actionLabel,
                   actionCancel,
                   actionCancelLabel,
               }: ModalProps) {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [remainingTime, setRemainingTime] = useState(closeTimer || 0);
    const [percentage, setPercentage] = useState(100);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        let interval: ReturnType<typeof setInterval>;

        if (isOpen) {
            setIsVisible(true);
            setIsFadingOut(false);
            setRemainingTime(closeTimer || 0);
            setPercentage(100);

            if (closeTimer) {
                timer = setTimeout(() => {
                    onClose();
                }, closeTimer);

                interval = setInterval(() => {
                    setRemainingTime((prev) => {
                        const newRemainingTime = prev - 100;
                        if (newRemainingTime <= 0) {
                            clearInterval(interval);
                            return 0;
                        }
                        setPercentage((newRemainingTime / closeTimer) * 100);
                        return newRemainingTime;
                    });
                }, 100);
            }
        } else {
            setIsFadingOut(true);
            setTimeout(() => {
                setIsVisible(false);
            }, 300);
            setIsLoading(false);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isOpen, closeTimer, onClose]);

    const handleActionClick = async () => {
        setIsLoading(true);
        if (action) {
            action();
        }
    };

    const handleActionCancelClick = async () => {
        setIsLoading(true);
        if (actionCancel) {
            actionCancel();
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && allowBlurClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [allowBlurClose, onClose]);

    if (!isVisible) return null;
    return (
        <div
            className={`${styles.modal} ${isFadingOut ? styles['fade-out'] : ''}`}
            onClick={allowBlurClose ? onClose : undefined}
            onKeyDown={
                allowBlurClose
                    ? (e) => {
                        if (e.key === 'Escape') {
                            onClose();
                        }
                    }
                    : undefined
            }
            role="button"
            tabIndex={-1}
        >
            <div
                className={styles['modal-content']}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') e.stopPropagation();
                }}
                role="button"
                tabIndex={0}
            >
                <div className={styles['modal-inner']}>
                    {children}
                    {showCloseButton || action || actionCancel ? (
                        <div className={styles['button-container']}>
                            {showCloseButton ? (
                                <Button width="120px" size="small" onClick={onClose}>
                                    {closeLabel ? closeLabel : 'Close'}
                                </Button>
                            ) : null}
                            {action ? (
                                <Button width="120px" size="small" onClick={handleActionClick} state="secondary" disabled={isLoading}>
                                    {isLoading ? <i className="fas fa-spinner fa-spin" /> : actionLabel ? actionLabel : 'Action'}
                                </Button>
                            ) : null}
                            {actionCancel ? (
                                <Button width="200px" size="small" onClick={handleActionCancelClick} state="error" disabled={isLoading}>
                                    {isLoading ? (
                                        <i className="fas fa-spinner fa-spin" />
                                    ) : actionCancelLabel ? (
                                        actionCancelLabel
                                    ) : (
                                        'Cancel'
                                    )}
                                </Button>
                            ) : null}
                        </div>
                    ) : null}
                </div>
                {closeTimer && Math.ceil(remainingTime / 1000) > 0 ? (
                    <div className={styles['percentage-bar']} style={{ width: `${percentage}%` }} />
                ) : null}
            </div>
        </div>
    );
}

export default Modal;
