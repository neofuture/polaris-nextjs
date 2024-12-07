import React from 'react';
import styles from './form-radio-input.module.css';

interface FormRadioInputProps {
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormRadioInput: React.FC<FormRadioInputProps> = ({ name, value, label, checked, onChange, error }) => {
    return (
        <div className={styles['radio-input']}>
            <input
                type="radio"
                id={value}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`${styles.input} ${error ? styles['error-input'] : ''}`}
            />
            <label htmlFor={value} className={styles.label}>
                {label}
            </label>
        </div>
    );
};

export default FormRadioInput;