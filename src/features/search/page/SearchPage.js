import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSearchResults, selectSortedAndFilteredProducts} from '../redux/searchSlice';
import styles from './SearchPage.module.css';
import SearchResultsList from "../components/SearchResultsList/SearchResultsList";
import Spinner from "../../../common/components/Spinner/Spinner";

const SearchPage = () => {
    const {searchTerm} = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.search.products);

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';


    useEffect(() => {
        dispatch(fetchSearchResults({searchTerm}));
    }, [searchTerm, dispatch]);

    return (
        <div className={`${styles.searchPage} ${rtlStyles}`}>
            {products.length > 0 ?
                <SearchResultsList
                    isRtl={isRtl}
                    searchTerm={searchTerm}
                /> :
                <div className={styles.loading}>
                    <Spinner/>
                </div>
            }

        </div>
    );
};

export default SearchPage;
