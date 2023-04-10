import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchMostSearchedProducts, fetchNewArrivals } from '../../redux/actions/productActions';
import styles from './HomePage.module.css';

const HomePage = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.products.categories);
    const mostSearchedProducts = useSelector((state) => state.products.mostSearched);
    const newArrivals = useSelector((state) => state.products.newArrivals);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchMostSearchedProducts());
        dispatch(fetchNewArrivals());
    }, [dispatch]);

    return (
        <div className={styles.homePage}>
            {/* Render categories, most searched products, and new arrivals */}
        </div>
    );
};

export default HomePage;