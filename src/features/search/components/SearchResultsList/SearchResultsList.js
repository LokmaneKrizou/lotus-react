import styles from './SearchResultsList.module.css';
import ProductCard from '../../../product/components/ProductCard/ProductCard';
import React, {useCallback, useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchResults, selectSortedAndFilteredProducts} from '../../redux/searchSlice';
import SearchFilters from '../SearchFilters/SearchFilters';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";

const SearchResultsList = ({isRtl, searchTerm}) => {
    const dispatch = useDispatch();
    const pageInfo = useSelector((state) => state.search.pageInfo);
    const filteredProducts = useSelector(selectSortedAndFilteredProducts);
    const observer = useRef(null);
    // const [showFilters, setShowFilters] = useState(false);

    const lastProductElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && pageInfo.hasNextPage) {
                dispatch(fetchSearchResults({searchTerm, cursor: pageInfo.endCursor}));
            }
        });
        if (node) observer.current.observe(node);
    }, [searchTerm, pageInfo, dispatch]);

    return (
        <div className={styles.searchContainer}>
            {/*TODO improve Filters for phase 2*/}
            {/*<button className={styles.filterButton} onClick={() => setShowFilters(!showFilters)}>Filters</button>*/}
            {/*<div className={showFilters ? `${styles.searchFilters} ${styles.show}` : styles.searchFilters}>*/}
            {/*    <div className={styles.searchFiltersModal}>*/}
            {/*        <div className={styles.clearButton}>*/}
            {/*            <button className={styles.applyButton} onClick={() => setShowFilters(false)}>Clear</button>*/}
            {/*        </div>*/}
            {/*        <SearchFilters/>*/}
            {/*        <button className={styles.applyButton} onClick={() => setShowFilters(false)}>Apply</button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={styles.searchResultsContainer}>
                <div className={styles.searchResults}>
                    {filteredProducts.map((product, index) => {
                        if (filteredProducts.length === index + 1) {
                            return <ProductCard key={product._id} ref={lastProductElementRef} product={product}
                                                isRtl={isRtl}/>
                        } else {
                            return <ProductCard key={product._id} product={product} isRtl={isRtl}/>
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsList;
