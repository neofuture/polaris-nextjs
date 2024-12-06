import React from 'react';
import clsx from 'clsx';
import styles from './text.module.css';

interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
    color?: 'default' | 'inherit' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
    size?: 'T200' | 'T300' | 'T400' | 'T500' | 'T600' | 'T700' | 'T800' | 'T900';
    weight?: 'light' | 'regular' | 'medium' | 'heavy' | 'bold';
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ as: Component = 'span', color = 'default', size = 'T400', weight = 'regular', children }) => {
    return (
        <Component className={clsx(styles.text, styles[color], styles[size], styles[weight])}>
            {children}
        </Component>
    );
};

export default Text;