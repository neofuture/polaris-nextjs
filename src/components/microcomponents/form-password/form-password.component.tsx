import React, {useState} from 'react';
import styles from './form-password.module.css';

interface FormPasswordProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    id: string;
    showPassword?: boolean;
}

const FormPassword: React.FC<FormPasswordProps> = ({label, value, onChange, error, id, showPassword = false}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(showPassword);

    const toggleShowPassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className={styles['form-input']}>
            <label htmlFor={id} className={styles['form-label']}>{label}</label>
            <div className={styles['input-wrapper']}>
                <input
                    id={id}
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    className={`${styles['form-field']} ${error ? styles['error'] : ''}`}
                />
                <button className={styles['toggle-button']}>
                    <i onClick={toggleShowPassword}
                       className={isPasswordVisible ? 'fad fa-eye-slash' : 'fad fa-eye'}></i>
                </button>
            </div>
            {error && <span className={styles['error-message']}>{error}</span>}
        </div>
    );
};

export default FormPassword;