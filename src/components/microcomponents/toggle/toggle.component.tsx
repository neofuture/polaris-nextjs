import React, { useEffect, useState } from 'react';
import styles from './toggle.module.css';

interface ToggleProps {
    initialState: boolean;
    onToggle: () => void;
}

const Toggle: React.FC<ToggleProps> = ({ initialState, onToggle }) => {
    const [isToggled, setIsToggled] = useState(initialState);

    useEffect(() => {
        setIsToggled(initialState);
    }, [initialState]);

    const handleToggle = () => {
        setIsToggled(!isToggled);
        onToggle();
    };

    return (
        <div className={styles.toggle} onClick={handleToggle}>
            <div className={`${styles.switch} ${isToggled ? styles.toggled : ''}`} />
        </div>
    );
};

export default Toggle;