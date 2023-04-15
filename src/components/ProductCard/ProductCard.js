import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({product, isRtl, className}) => {
    const {id, title, images, price, colors, description, sizes} = product;
    const showAddToCart = (colors && colors.length > 1) || (sizes && sizes.length > 1)
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <div className={`${className? className:styles.productCard} ${rtlStyles}`}>
            <div className={styles.productImage}>
                <img src={images[0]} alt={title}/>
            </div>
            <div className={styles.productInfo}>
                <div>
                    <h3 className={styles.title}>{title}</h3>
                    <p className={styles.description}>{description}</p>
                    <p className={styles.price}>DA {price}</p>
                </div>
                {showAddToCart && (
                    <button className={styles.addToCartButton}>Add to Cart</button>
                )}
            </div>
        </div>
    );
};


export default ProductCard;
