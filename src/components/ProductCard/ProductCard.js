import React from 'react';
import styles from './ProductCard.module.css';
import {Link} from "react-router-dom";

const ProductCard = ({product, isRtl, className}) => {
    const {_id, title, images, price, colors, description, sizes} = product;
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <Link to={`/product/${_id}`} target="_blank" className={styles.productLink}>
            <div className={`${styles.productCard} ${rtlStyles}`}>
                <div className={styles.productImage}>
                    <img src={images[0]} alt={title}/>
                </div>
                <div className={styles.productInfo}>
                    <div>
                        <h3 className={styles.description}>{title}</h3>
                        {/*<p className={styles.description}>{description}</p>*/}
                        <p className={styles.price}>DA {price}</p>
                    </div>
                </div>
                <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
        </Link>
    );
};


export default ProductCard;
