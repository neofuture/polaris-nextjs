import React from 'react';
import clsx from 'clsx';
import styles from './text.module.css';

interface TextProps {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'a' | 'button' | 'label' | 'li' | 'ul' | 'ol' | 'nav' | 'section' | 'article' | 'header' | 'footer' | 'main';
    state?: 'default' | 'inherit' | 'success' | 'error' | 'warning' | 'info' | 'primary' | 'secondary';
    size?: 'T200' | 'T300' | 'T400' | 'T500' | 'T600' | 'T700' | 'T800' | 'T900';
    weight?: '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
    underline?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    children?: React.ReactNode;
}

const Text: React.FC<TextProps> = ({ as: Component = 'div', state = 'default', size = 'T400', weight = '400', underline = false, italic = false, strikethrough = false, children }) => {
    return (
        <Component className={clsx(styles.text, styles[state], styles[size], styles[`weight-${weight}`], { [styles.underline]: underline, [styles.italic]: italic, [styles.strikethrough]: strikethrough })}>
            {children}
        </Component>
    );
};

export default Text;