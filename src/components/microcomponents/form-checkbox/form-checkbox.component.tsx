import React from 'react';
import styles from './form-checkbox.module.css';

interface FormCheckboxInputProps {
    id: string;
    name: string;
    value: string;
    label: string;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    rounded?: boolean;
}

const FormCheckbox: React.FC<FormCheckboxInputProps> = ({ id, name, value, label, checked, onChange = () => {}, error, rounded = false }) => {
    return (
        <div className={styles['checkbox-input']}>
            <div className={styles['checkbox-container']}>
                <input
                    type="checkbox"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onChange}
                    className={`${styles.input} ${rounded ? styles['rounded-input'] : ''} ${error ? styles['error-input'] : ''}`}
                />
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            </div>
            {error && <span className={styles['error-message']}><i className='fas fa-xmark'/> {error}</span>}
        </div>
    );
};

export default FormCheckbox;