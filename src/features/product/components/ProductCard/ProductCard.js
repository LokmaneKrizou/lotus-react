import React from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";
import useCurrencyFormatter from "../../../../util/priceFormatter";

const ProductCard = React.forwardRef(({product, isRtl, className}, ref) => {
    const {_id, title, images, price} = product;
    const rtlStyles = isRtl ? styles.rtl : '';
    const priceFormatter = useCurrencyFormatter();
    return (
        <div ref={ref} className={`${styles.productCard} ${rtlStyles}`}>
            <Link to={`/product/${_id}`} target="_blank" className={styles.productLink}>
                <div className={styles.productImage}>
                    <img src={images[0]} alt={title}/>
                </div>
                <div className={styles.productInfo}>
                    <div>
                        <h3 className={styles.title}>{title}</h3>
                        {/*<p className={styles.description}>{description}</p>*/}
                        <p className={styles.price}>{priceFormatter(price)}</p>
                    </div>
                </div>
                <button className={styles.addToCartButton}>Add to Cart</button>
            </Link>
        </div>
    );
});

export default ProductCard;
