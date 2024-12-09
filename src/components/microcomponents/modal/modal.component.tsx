import React, { useState, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";
import { RemoveScroll } from "react-remove-scroll";
import styles from "./modal.module.css";
import Button from "@/components/microcomponents/button/button.component";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseButton?: boolean;
    allowBlurClose?: boolean;
    closeTimer?: number;
}

const Modal: React.FC<ModalProps> = (
    {
        isOpen,
        onClose,
        children,
        showCloseButton = true,
        allowBlurClose = true,
        closeTimer
    }
) => {
    const [isVisible, setIsVisible] = useState(isOpen);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [remainingTime, setRemainingTime] = useState(closeTimer || 0);
    const [percentage, setPercentage] = useState(100);
    const firstFocusableElementRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

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
                    setRemainingTime(prev => {
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

            if (firstFocusableElementRef.current) {
                firstFocusableElementRef.current.focus();
            }
        } else {
            setIsFadingOut(true);
            setTimeout(() => setIsVisible(false), 300);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isOpen, closeTimer, onClose]);

    if (!isVisible) return null;
    return (
        <RemoveScroll>
            <FocusLock>
                <div className={`${styles.modal} ${isFadingOut ? styles["fade-out"] : ""}`}
                     onClick={allowBlurClose ? onClose : undefined}
                     role="dialog"
                     aria-labelledby="modal-content"
                     aria-describedby="modal-content"
                     aria-modal="true">
                    <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
                        <div className={styles["modal-inner"]}>
                            <div id="modal-content">
                                {children}
                            </div>
                            {showCloseButton &&
                                <div className={styles["button-container"]}>
                                    <div ref={firstFocusableElementRef}>
                                        <Button iconName='fas fa-xmark' size={'small'} onClick={onClose}>Close</Button>
                                    </div>
                                </div>}
                        </div>
                        {closeTimer && Math.ceil(remainingTime / 1000) > 0 &&
                            <div className={styles["percentage-bar"]} style={{width: `${percentage}%`}}></div>
                        }
                    </div>
                </div>
            </FocusLock>
        </RemoveScroll>
    );
};

export default Modal;