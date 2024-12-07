import React from 'react';
import clsx from 'clsx';
import styles from './text.module.css';

interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a' | 'button' | 'label' | 'li' | 'ul' | 'ol' | 'nav' | 'section' | 'article' | 'header' | 'footer' | 'main';
    state?: 'default' | 'inherit' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
    size?: 'T200' | 'T300' | 'T400' | 'T500' | 'T600' | 'T700' | 'T800' | 'T900';
    weight?: 'light' | 'regular' | 'medium' | 'heavy' | 'bold';
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ as: Component = 'span', state = 'default', size = 'T400', weight = 'regular', children }) => {
    return (
        <Component className={clsx(styles.text, styles[state], styles[size], styles[weight])}>
            {children}
        </Component>
    );
};

export default Text;