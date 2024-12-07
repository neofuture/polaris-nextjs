import React from 'react';
import styles from './form-radio-group.module.css';

interface FormRadioGroupProps {
    label: string;
    error?: string;
    children: React.ReactNode;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = ({ label, error, children }) => {
    return (
        <div className={styles['form-group']}>
            <label className={styles['form-label']}>{label}</label>
            <div className={styles['radio-group']}>
                {children}
            </div>
            {error && <div className={styles['error-message']}><i className='fas fa-xmark'/> {error}</div>}
        </div>
    );
};

export default FormRadioGroup;