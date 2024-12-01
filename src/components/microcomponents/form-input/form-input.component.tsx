import React from 'react';
import styles from './form-input.module.css';

interface FormInputProps {
    type: 'text' | 'password' | 'email' | 'url' | 'tel' | 'number' | 'range' |
        'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'color' |
        'radio' | 'file' | 'image';
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const FormInput: React.FC<FormInputProps> = ({type, label, value, onChange, error}) => {
    return (
        <div className={styles['form-input']}>
            <label className={styles['form-label']}>{label}</label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                className={`${styles['form-field']} ${error ? styles['error'] : ''}`}
            />
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    );
};

export default FormInput;