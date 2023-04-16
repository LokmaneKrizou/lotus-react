import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategories} from '../../redux/slices/categoriesSlice';
import {fetchMostSearchedProducts} from '../../redux/slices/mostSearchedProductsSlice';
import {fetchNewArrivals} from '../../redux/slices/newArrivalsSlice';
import CategoriesList from '../../components/CategoriesList/CategoriesList';
import ProductsList from '../../components/ProductsList/ProductsList';
import TrendingProduct from '../../components/TrendingProduct/TrendingProduct';
import styles from './HomePage.module.css'

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchMostSearchedProducts());
        dispatch(fetchNewArrivals());
    }, [dispatch]);
    const mostSearchedProducts = useSelector((state) => state.mostSearchedProducts.products);
    const newArrivalProducts = useSelector((state) => state.newArrivals.products);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.homePage} ${rtlStyles}`}>
            <CategoriesList/>
            <div className={styles.body}>
                <TrendingProduct isRtl={isRtl}/>
                <div className={styles.divider}></div>
                <ProductsList products={mostSearchedProducts} header={"Most Searched Products"}/>
                <div className={styles.divider}></div>
                <ProductsList products={newArrivalProducts} header={"New Arrivals"}/>
            </div>
        </div>
    );
};

export default HomePage;