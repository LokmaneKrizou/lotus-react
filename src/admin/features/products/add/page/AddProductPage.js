import React from 'react';
import {useSelector} from 'react-redux';
import styles from './AddProductPage.module.css'
import ErrorView from "../../../../../common/components/ErrorView/ErrorView";
import emptySearch from "../../../../../assets/images/orderStatus/confirmed.svg";

const AddProductPage = () => {

    const isRtl = useSelector((state) => state.rtl.isRtl);
    const rtlStyles = isRtl ? styles.rtl : '';
    return (
        <div className={`${styles.addProductPage} ${rtlStyles}`}>
            <div className={styles.body}>
                <ErrorView
                    image={emptySearch}
                    content={`No product results found,`}
                />
            </div>
        </div>
    );
};

export default AddProductPage;