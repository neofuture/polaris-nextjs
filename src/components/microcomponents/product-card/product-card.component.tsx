import React from 'react';
import styles from './product-card.module.css';

interface ProductCardProps {
    title: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title }) => {
    return (
        <div className={styles['product-card']}>
            <h2>{title}</h2>
        </div>
    );
};

export default ProductCard;