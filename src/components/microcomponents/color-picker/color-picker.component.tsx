import React from 'react';
import styles from './color-picker.module.css';

interface ColorPickerProps {
    selectedColor: string;
    onColorSelect: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorSelect }) => {
    const colors = ['blue', 'purple', 'red', 'orange', 'green', 'grey', 'ebg'];

    const handleColorSelect = (color: string) => () => {
        onColorSelect(color);
    };

    return (
        <div className={styles['color-picker']}>
            {colors.map(color => (
                <div
                    key={color}
                    className={`${styles[color]} ${styles.pip} ${selectedColor === color ? styles.active : ''}`}
                    onClick={handleColorSelect(color)}
                ></div>
            ))}
        </div>
    );
};

export default ColorPicker;