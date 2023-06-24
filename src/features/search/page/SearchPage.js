import React, {useCallback, useEffect, useRef} from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchResults } from '../redux/searchSlice';
import ProductCard from '../../product/components/ProductCard/ProductCard';
import styles from './SearchPage.module.css';

const SearchPage = () => {
    const { searchTerm } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.search.products);
    const pageInfo = useSelector((state) => state.search.pageInfo);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    const observer = useRef(null); // Initialize the ref with null
    const lastProductElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            console.log(`called : ${entries[0].isIntersecting}`)
            if (entries[0].isIntersecting && pageInfo.hasNextPage) {
                dispatch(fetchSearchResults({ searchTerm, cursor: pageInfo.endCursor }));
            }
        });
        if (node) observer.current.observe(node);
    }, [searchTerm, pageInfo, dispatch]);

    useEffect(() => {
        dispatch(fetchSearchResults({ searchTerm }));
    }, [searchTerm, dispatch]);

    return (
        <div className={`${styles.searchPage} ${rtlStyles}`}>
            <div className={styles.searchResults}>
                {products.map((product, index) => {
                    if (products.length === index + 1) {
                        return <ProductCard ref={lastProductElementRef} product={product} isRtl={isRtl} className={styles.productCard} />
                    } else {
                        return <ProductCard product={product} isRtl={isRtl} className={styles.productCard} />
                    }
                })}
            </div>
        </div>
    );
};

export default SearchPage;
