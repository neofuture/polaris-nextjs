import React from 'react';
import styles from './product-card.module.css';
import Button from "@/components/microcomponents/button/button.component";

interface ProductCardProps {
    payload: {
        title?: {
            text?: string;
            className?: string;
        };
        sections?: {
            title: string;
            content: string[];
            current: boolean;
            buttonText: string;
            buttonState: string;
            callBack: () => void;
            currentText?: string;
            cost?: string;
        }[];
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ payload }) => {
    return (
        <div className={styles['product-card']}>
            {payload.title && <h2 className={payload.title.className ? styles[payload.title.className] : ''}>{payload.title.text}</h2>}
            <div className={styles['productCard__container']}>
            {payload.sections && payload.sections.map((section, index) => (
                <div key={index} className={styles['product-card__section']}>
                    <div className={styles['product-card__section-header']}>
                        <h3 className={section.current ? styles['primary-color'] : ''}>{section.title}</h3>
                        <div className={section.current ? styles['primary-color'] : ''}>{section.current && <h5>{section.currentText}</h5>}</div>
                        <div>
                            <Button onClick={section.callBack} small={true} state={section.buttonState}>{section.buttonText}</Button>
                        </div>
                    </div>
                    <div className={styles['product-card__section-content']}>
                        <ul>
                            {section.content.map((content, index) => (
                                <li key={index}>{content}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['product-card__section-footer']}>
                        {section.cost && <h4>{section.cost}</h4>}
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default ProductCard;