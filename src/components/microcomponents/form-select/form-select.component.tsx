import React from 'react';
import styles from './form-select.module.css';

interface FormSelectProps {
    label: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    error?: string;
    id: string;
}

const FormSelect: React.FC<FormSelectProps> = ({label, value, onChange, options, error, id}) => {
    return (
        <div className={styles['form-select']}>
            <label htmlFor={id} className={styles['form-label']}>{label}</label>
            <select
                id={id}
                className={`${styles['form-field']} ${error ? styles['error'] : ''}`}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className={styles['error-message']}><i className='fas fa-xmark'/> {error}</div>}
        </div>
    );
};

export default FormSelect;