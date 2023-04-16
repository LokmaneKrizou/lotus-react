import React from 'react';
import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsList.module.css';
import {useSelector} from "react-redux";
import SectionHeader from "../SectionHeader/SectionHeader";

const ProductsList = ({products, header}) => {
    const error = useSelector((state) => state.mostSearchedProducts.error);

    if (error) {
        return <p>Something went wrong while fetching most searched products. Please try again later.</p>;
    }
    return (
        <div className={styles.container}>
            <SectionHeader title={header}/>
            <div className={styles.productsList}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product}/>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
