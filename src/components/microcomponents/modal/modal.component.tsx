import React, {useState, useEffect} from "react";
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
        <div className={`${styles.modal} ${isFadingOut ? styles["fade-out"] : ""}`}
             onClick={allowBlurClose ? onClose : undefined}>
            <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
                <div className={styles["modal-inner"]}>
                    {children}
                    {showCloseButton &&
                        <div className={styles["button-container"]}>
                            <Button iconName='fas fa-xmark' size={'small'} onClick={onClose}>Close</Button>
                        </div>}
                </div>
                {closeTimer && Math.ceil(remainingTime / 1000) > 0 &&
                    <div className={styles["percentage-bar"]} style={{width: `${percentage}%`}}></div>
                }
            </div>
        </div>
    );
};

export default Modal;