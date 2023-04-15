import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories} from '../../redux/slices/categoriesSlice';
import {fetchMostSearchedProducts} from '../../redux/slices/mostSearchedProductsSlice';
import {fetchNewArrivals} from '../../redux/slices/newArrivalsSlice';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import MostSearchedProductsList from '../../components/MostSearchedProductsList/MostSearchedProductsList';
import NewArrivalsList from '../../components/NewArrivalsList/NewArrivalsList';
import CustomerTestimonialsList from '../../components/CustomerTestimonialsList/CustomerTestimonialsList';
import TrendingProduct from '../../components/TrendingProduct/TrendingProduct';
import styles from './HomePage.module.css'

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchMostSearchedProducts());
        dispatch(fetchNewArrivals());
    }, [dispatch]);

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.homePage} ${rtlStyles}`}>
            <CategoriesList/>
            <TrendingProduct isRtl={isRtl}/>
            <div className={styles.divider}></div>
            <MostSearchedProductsList/>
            <div className={styles.divider}></div>
            <NewArrivalsList/>
            <div className={styles.divider}></div>

        </div>
    );
};

export default HomePage;