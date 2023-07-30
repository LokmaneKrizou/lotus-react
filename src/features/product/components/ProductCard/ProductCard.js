import React from 'react';
import {Link} from "react-router-dom";
import useCurrencyFormatter from "../../../../util/priceFormatter";
import styles from './ProductCard.module.css';

const ProductCard = React.forwardRef(({product, isRtl}, ref) => {
    const { _id, title: productTitle, images, price: productPrice } = product;
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div ref={ref} className={`${styles.productCard} ${rtlStyles}`}>
            <Link to={`/product/${_id}`} className={styles.productLink}>
                <div className={styles.productImage}>
                    <img src={images[0]} alt={productTitle}/>
                </div>
                <div className={styles.productInfo}>
                    <div>
                        <h3 className={styles.title}>{productTitle}</h3>
                        <p className={styles.price}>{useCurrencyFormatter()(productPrice)}</p>
                    </div>
                    <button className={styles.addToCartButton}>Add to Cart</button>
                </div>
            </Link>
        </div>
    );
});

export default ProductCard;
