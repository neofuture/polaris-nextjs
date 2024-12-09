import React, { useState } from 'react';
import styles from './custom-dropdown.module.css';

interface Option {
    value: string;
    label: string;
    icon?: string;
}

interface CustomDropdownProps {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
    label: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.dropdown}>
            <label className={styles['dropdown-label']}>{label}</label>
            <button className={styles['dropdown-button']} onClick={() => setIsOpen(!isOpen)}>
                {value ? (
                    <>
                        {options.find(option => option.value === value)?.icon && (
                            <i className={options.find(option => option.value === value)?.icon}></i>
                        )}

                        {options.find(option => option.value === value)?.label}
                    </>
                ) : 'Select an icon'}
            </button>
            {isOpen && (
                <div className={styles['dropdown-content']}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles['dropdown-item']}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.icon && <i className={option.icon}></i>} {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;