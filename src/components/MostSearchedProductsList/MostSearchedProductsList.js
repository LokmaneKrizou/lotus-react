import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './MostSearchedProductsList.module.css';
import {useSelector} from "react-redux";

const MostSearchedProductsList = () => {
    const products = useSelector((state) => state.mostSearchedProducts.products);
    const error = useSelector((state) => state.mostSearchedProducts.error);

    if (error) {
        return <p>Something went wrong while fetching most searched products. Please try again later.</p>;
    }
    return (
        <div className={styles.container}>
            <p>Most Searched Products</p>
        <div className={styles.mostSearchedProductsList}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
        </div>
    );
};

export default MostSearchedProductsList;
