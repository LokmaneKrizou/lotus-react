import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSearchResults} from '../redux/searchSlice';
import styles from './SearchPage.module.css';
import SearchResultsList from "../components/SearchResultsList/SearchResultsList";
import Spinner from "../../../common/components/Spinner/Spinner";
import ErrorView from "../../../common/components/ErrorView/ErrorView";
import emptySearch from '../../../assets/images/emptySearch/empty_search.svg'

const SearchPage = () => {
    const {searchTerm} = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.search.products);
    const error = useSelector(state => state.search.error);
    const status = useSelector(state => state.search.status);
    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';

    useEffect(() => {
        dispatch(fetchSearchResults({searchTerm}));
    }, [searchTerm, dispatch]);
    return (
        <div className={`${styles.searchPage} ${rtlStyles}`}>
            {status === 'loading' && !products.length ? (
                <div className={styles.loading}>
                    <Spinner/>
                </div>
            ) : status === 'succeeded' || (status === 'loading' && products.length) ? (
                <div>
                    {products.length > 0 ? (
                        <SearchResultsList
                            isRtl={isRtl}
                            searchTerm={searchTerm}
                        />
                    ) : (
                        <ErrorView
                            image={emptySearch}
                            content={`No product results found for "${searchTerm}", 
                        Please use another term.`}
                        />
                    )}
                    {status === 'loading' && <div className={styles.loading}><Spinner/>
                    </div>}
                </div>
            ) : status === 'failed' ? (
                <ErrorView
                    image={emptySearch}
                    alt={"Empty Search"}
                    content={error ? error : `An error occurred while fetching the search results. Please try again later.`}
                />
            ) : null}
        </div>
    );
};

export default SearchPage;
