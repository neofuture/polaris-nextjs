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
    id: string;
}

const FormInput: React.FC<FormInputProps> = ({type, label, value, onChange, error, id}) => {
    return (
        <div className={styles['form-input']}>
            <label htmlFor={id} className={styles['form-label']}>{label}</label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`${styles['form-field']} ${error ? styles['error'] : ''}`}
            />
            {error && <span className={styles['error-message']}><i className='fas fa-xmark'/> {error}</span>}
        </div>
    );
};

export default FormInput;