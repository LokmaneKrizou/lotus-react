import React from 'react';
import styles from './TrendingProduct.module.css';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";

const TrendingProduct = ({isRtl}) => {
    const trendingProduct = useSelector((state) => state.mostSearchedProducts.trendingProduct);

    const error = useSelector((state) => state.mostSearchedProducts.error);

    if (error || !trendingProduct) {
        return null;
    }
    const rtlStyles = isRtl ? styles.rtl : '';

    return (
        <div className={`${styles.trendingProduct} ${rtlStyles}`}>
            <div className={styles.productPrimaryImage}>
                <div className={styles.trendingProductTitle}>Trending Now</div>
                <div className={styles.productTitle}>{trendingProduct.title}</div>
                <div className={styles.shopNowBtn}><Link to={`/product/${trendingProduct._id}`}>Shop Now</Link></div>
                <img src={trendingProduct.images[0]} alt={trendingProduct.name}/>
            </div>
            <div className={styles.productSecondaryImages}>
                {trendingProduct.images.slice(1).map((image, index) => (
                    <img key={index} src={image} alt={trendingProduct.name}/>
                ))}
                <div className={styles.productDescription}>{trendingProduct.description}</div>
            </div>

            <div className={styles.seeMoreButton}><Link to={`/product/${trendingProduct._id}`}>See More</Link></div>
        </div>
    );
};

export default TrendingProduct;

