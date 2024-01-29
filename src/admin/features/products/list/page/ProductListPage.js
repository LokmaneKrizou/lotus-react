import React from 'react';
import {useSelector} from 'react-redux';
import styles from './ProductListPage.module.css'
import ErrorView from "../../../../../common/components/ErrorView/ErrorView";
import emptySearch from "../../../../../assets/images/emptySearch/empty_search.svg";

const ProductListPage = () => {

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.productListPage} ${rtlStyles}`}>
            <div className={styles.body}>
                <ErrorView
                    image={emptySearch}
                    content={`No product results found,`}
                />
            </div>
        </div>
    );
};

export default ProductListPage;