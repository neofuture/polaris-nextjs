import React, { ReactNode } from 'react';
import styles from './product-card-container.module.css';

interface ProductCardContainerProps {
    children: ReactNode;
}

const ProductCardContainer: React.FC<ProductCardContainerProps> = ({ children }) => {
    return (
        <div className={styles['product-card-container']}>
            {children}
        </div>
    );
}

export default ProductCardContainer;