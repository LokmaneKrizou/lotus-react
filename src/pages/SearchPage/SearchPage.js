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
    const status = useSelector((state) => state.search.status);
    const error = useSelector((state) => state.search.error);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    useEffect(() => {
        console.log(searchTerm);
        dispatch(fetchSearchResults(searchTerm));
    }, [searchTerm, dispatch]);

    return (
        <div className={`${styles.searchPage} ${rtlStyles}`}>
            <div className={styles.searchResults}>
                {products.map((product) => (
                    <ProductCard product={product} isRtl={isRtl} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
