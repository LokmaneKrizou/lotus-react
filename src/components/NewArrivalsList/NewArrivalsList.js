import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './NewArrivalsList.module.css';
import {useSelector} from "react-redux";

const NewArrivalsList = () => {
    const products = useSelector((state) => state.newArrivals.products);
    const error = useSelector((state) => state.mostSearchedProducts.error);

    if (error || !products) {
        return <p>Something went wrong while fetching most searched products. Please try again later.</p>;
    }
    return (
        <div className={styles.container}>
            <p>New Arrivals</p>
        <div className={styles.newArrivalsList}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        </div>
    );
};

export default NewArrivalsList;
