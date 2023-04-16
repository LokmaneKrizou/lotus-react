import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../redux/slices/searchSlice';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './SearchPage.module.css';

const SearchPage = () => {
    const { searchTerm } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.search.products);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    useEffect(() => {
        dispatch(fetchSearchResults(searchTerm));
    }, [searchTerm, dispatch]);

    return (
        <div className={`${styles.searchPage} ${rtlStyles}`}>
            <div className={styles.searchResults}>
                {products.map((product) => (
                    <ProductCard product={product} isRtl={isRtl} className={styles.productCard} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
